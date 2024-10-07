from astroquery.gaia import Gaia
import astropy.units as u
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import os
from flask import Flask, send_file, request, jsonify
from flask_cors import CORS

# Configurar matplotlib para usar 'Agg' como backend
plt.switch_backend('Agg')

app = Flask(__name__)
# Permitir solicitudes CORS solo desde un origen específico
CORS(app, origins=["https://ncwj6j5n-5173.use.devtunnels.ms", "http://localhost:5173", "http://127.0.0.1:5000", "https://f3f6-189-203-247-6.ngrok-free.app", "https://andivi-nundoo.vercel.app"])

# Leer los datos
planetas = pd.read_csv("planetas.csv")

# Función para generar el mapa estelar
def generar_mapa_estelar(nombre_planeta, output_path='mapa_estelar.png'):
    # Filtrar el planeta por nombre
    planet_selected = planetas[planetas['pl_name'].str.strip() == nombre_planeta.strip()]

    if planet_selected.empty:
        return None, f"El planeta {nombre_planeta} no se encontró en los datos."

    # Obtener los valores de distancia, ra, y dec
    sy_dist = planet_selected["sy_dist"].values[0]
    ra = np.radians(planet_selected["ra"].values[0])
    dec = np.radians(planet_selected["dec"].values[0])

    # Cálculo de las coordenadas cartesianas
    x_planeta = sy_dist * np.cos(ra) * np.cos(dec)
    y_planeta = sy_dist * np.sin(ra) * np.cos(dec)
    z_planeta = sy_dist * np.sin(dec)

    # Límite de distancia
    x_lim = x_planeta + 1000
    y_lim = y_planeta + 1000
    z_lim = z_planeta + 1000

    # Cálculo de la distancia usando la fórmula general
    dist_lim = np.sqrt(x_lim**2 + y_lim**2 + z_lim**2)

    # Cálculo de ascensión recta (RA) y declinación (DEC)
    ra_lim = np.arctan2(y_lim, x_lim)
    dec_lim = np.arcsin(z_lim / dist_lim)

    # Comparaciones para determinar los límites
    dist_a = min(sy_dist, dist_lim)
    dist_b = max(sy_dist, dist_lim)

    ra_a = min(np.degrees(ra), np.degrees(ra_lim))
    ra_b = max(np.degrees(ra), np.degrees(ra_lim))

    dec_a = min(np.degrees(dec), np.degrees(dec_lim))
    dec_b = max(np.degrees(dec), np.degrees(dec_lim))

    # Consulta a GAIA con los límites calculados
    query = f"""
    SELECT source_id, ra, dec, parallax, distance_gspphot, phot_g_mean_mag
    FROM gaiadr3.gaia_source
    WHERE distance_gspphot BETWEEN {dist_a} AND {dist_b}
      AND ra BETWEEN {ra_a} AND {ra_b}
      AND dec BETWEEN {dec_a} AND {dec_b}
    """

    job = Gaia.launch_job(query)  # Ejecutar consulta
    results = job.get_results()  # Obtener resultados

    if results is None or len(results) == 0:
        return None, "No se encontraron estrellas dentro del rango especificado."

    # Extraer las posiciones y magnitudes de las estrellas
    ra = results['ra']
    dec = results['dec']
    mag = results['phot_g_mean_mag']

    # Configurar el tamaño del gráfico
    plt.figure(figsize=(19.2, 10.8), dpi=100)
    plt.style.use('dark_background')

    # Mapa de colores
    colors = plt.cm.binary((mag - mag.min()) / (mag.max() - mag.min()))

    # Graficar las estrellas
    plt.scatter(ra, dec, c=colors, s=20/(mag**1), alpha=0.75)

    # Invertir el eje RA
    plt.gca().invert_xaxis()
    plt.axis('off')

    # Guardar la imagen
    plt.savefig(output_path, dpi=100, bbox_inches='tight', pad_inches=0)
    plt.close()

    return output_path, None

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'https://f3f6-189-203-247-6.ngrok-free.app/'
    response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
    return response


# Ruta principal para la API que genera el mapa estelar
@app.route('/api/mapa_estelar', methods=['GET'])
def obtener_mapa_estelar():
    nombre_planeta = request.args.get('nombre_planeta')

    if not nombre_planeta:
        return jsonify({"error": "Debe proporcionar el nombre del planeta."}), 400

    output_path, error = generar_mapa_estelar(nombre_planeta)

    if error:
        return jsonify({"error": error}), 404

    return send_file(output_path, mimetype='image/png')

# Iniciar la API
if __name__ == '__main__':
    app.run(debug=True)
