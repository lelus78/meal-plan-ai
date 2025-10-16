#!/usr/bin/env python3
"""
Server locale per testare il Piano Alimentare
Uso: python start_server.py
Poi apri: http://localhost:8000/piano_dieta_mensile_IA.html
"""

import http.server
import socketserver
import os
import socket

PORT = 8000

# Cambia nella directory del file
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Trova l'IP locale
def get_local_ip():
    try:
        # Crea un socket UDP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        # Non invia davvero dati
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Aggiungi header CORS per evitare problemi con le API
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

if __name__ == "__main__":
    local_ip = get_local_ip()

    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print("\n" + "="*60)
        print("🍽️  SERVER PIANO ALIMENTARE AVVIATO")
        print("="*60)
        print(f"\n📱 Su questo computer:")
        print(f"   http://localhost:{PORT}/piano_dieta_mensile_IA.html")
        print(f"\n📱 Su iPhone (stessa rete WiFi):")
        print(f"   http://{local_ip}:{PORT}/piano_dieta_mensile_IA.html")
        print(f"\n⚠️  NOTA: Assicurati che iPhone e computer siano sulla STESSA rete WiFi")
        print(f"\n🛑 Per fermare il server: premi CTRL+C")
        print("="*60 + "\n")

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Server fermato!")
