from http.server import BaseHTTPRequestHandler
import swisseph as swe
import json
import datetime

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # 1. Initialize System
        swe.set_sid_mode(swe.SIDM_LAHIRI)
        
        # 2. Get current time (July 6, 2026)
        # We use current UT time for precision
        now = datetime.datetime.utcnow()
        jd = swe.julday(now.year, now.month, now.day, now.hour + now.minute/60.0)
        
        # 3. Define Planets (0=Sun, 1=Moon, 2=Mars, etc.)
        planets = {
            "Sun": 0,
            "Moon": 1,
            "Mars": 2,
            "Mercury": 3,
            "Jupiter": 4,
            "Venus": 5,
            "Saturn": 6,
            "Rahu": 10,
            "Ketu": 11
        }
        
        results = {}
        for name, pid in planets.items():
            # Calculate longitude
            res = swe.calc_ut(jd, pid, swe.FLG_SIDEREAL)
            results[name] = round(res[0][0], 2)
            
        # 4. Return as JSON
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(results).encode())
      
