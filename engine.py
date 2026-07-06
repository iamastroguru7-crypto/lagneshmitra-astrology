import swisseph as swe

# Initialize Lahiri Ayanamsa (The Accuracy Base)
def init_system():
    swe.set_sid_mode(swe.SIDM_LAHIRI)
    print("Engine Ready: Lahiri Mode Locked.")

# Calculate Planet Position for a Specific Date
def get_planet_pos(jd, planet_id):
    # flags=swe.FLG_SIDEREAL for accurate Vedic calculation
    res = swe.calc_ut(jd, planet_id, swe.FLG_SIDEREAL)
    return res[0][0] # Returns longitude

init_system()
# JD for today: 2461228.0 (Approx for July 6, 2026)
# Test Sun (planet_id = 0)
sun_long = get_planet_pos(2461228.0, 0)
print(f"Sun Longitude: {sun_long}")

