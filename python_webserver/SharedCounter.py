import threading

class SharedCounter:
    def __init__(self, initial_value, lock):
        self.cnt = initial_value
        self.lock = lock

    def increase(self):
        self.lock.acquire()
        self.cnt = self.cnt + 1
        self.lock.release()

    def decrease(self):
        self.lock.acquire()
        self.cnt = self.cnt - 1
        self.lock.release()

    def get_value(self): #needs to be in a critical section from outside
        return self.cnt


