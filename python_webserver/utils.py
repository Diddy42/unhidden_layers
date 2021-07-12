def print_current_RAM_usage():
    try:
        f = open('/sys/fs/cgroup/memory/memory.usage_in_bytes', 'r')
        ram_bytes = int(f.read())
        f.close()
        print('current RAM usage: ' + str(round(ram_bytes/(1000*1000), 1)) + ' MB')

    except:
        print('could not read current RAM usage')