import time
import urllib.request
import os
import psutil

def print_current_RAM_usage():
    try:
        f = open('/sys/fs/cgroup/memory/memory.usage_in_bytes', 'r')
        ram_bytes = int(f.read())
        f.close()
        print('current RAM usage: ' + str(round(ram_bytes/(1000*1000), 1)) + ' MB')

    except:
        print('could not read current RAM usage')

def get_memory_used():
    pid = os.getpid()
    python_process = psutil.Process(pid)
    memoryUse = python_process.memory_info()[0]/2.**30  # memory use in GB...I think
    return memoryUse

def send_text(text, NotPrew=1):
    url_notification = 'https://api.telegram.org/bot441364514:AAEg1HTb6fPYHf84r5dRDnodIhD-Kl-ivQs/sendMessage?disable_web_page_preview=' + str(NotPrew) + '&chat_id=127648442&text='
    
    try:
        urllib.request.urlopen(url_notification + urllib.parse.quote(text), timeout=40)
        time.sleep(0.1)
        print('telegram text sent')
        
    except:
        print('could not send telegram text')

