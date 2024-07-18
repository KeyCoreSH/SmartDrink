from machine import Pin
import time

class HX711:
    def __init__(self, pin_dt, pin_sck):
        self.pin_dt = Pin(pin_dt, Pin.IN)
        self.pin_sck = Pin(pin_sck, Pin.OUT)
        self.pin_sck.value(0)
        self.tare_value = 0
        self.calibration_factor = 1  # Este valor será ajustado

    def read(self):
        count = 0
        while self.pin_dt.value() == 1:
            pass

        for i in range(24):
            self.pin_sck.value(1)
            count = count << 1
            self.pin_sck.value(0)
            if self.pin_dt.value():
                count += 1

        self.pin_sck.value(1)
        self.pin_sck.value(0)
        count ^= 0x800000  # 2's complement
        return count

    def tare(self, subtract=150, times=15):
        tare = 0
        for i in range(times):
            tare += self.read()
        self.tare_value = (tare // times) - (subtract * self.calibration_factor)

    def weight(self, times=5):
        weight = 0
        for i in range(times):
            weight += self.read()
        weight //= times
        weight -= self.tare_value
        return weight / self.calibration_factor

# Configuração dos pinos
pin_dt = 26
pin_sck = 27

hx711 = HX711(pin_dt, pin_sck)

# Calibração e tara
hx711.tare()  # Assume que nada está na balança e configura para subtrair 150g
print("Balança zerada (tara definida)")

# Coloque aqui um peso de 210g e ajuste o fator de calibração
hx711.calibration_factor = 400  # Este valor deve ser ajustado manualmente

# Loop principal para leitura do peso
while True:
    weight = hx711.weight()
    print("Peso: {:.2f} gramas".format(weight))
    time.sleep(2)  # Intervalo entre leituras