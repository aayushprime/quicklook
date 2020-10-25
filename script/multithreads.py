import time
import sys
import os
import threading
import random
sys.path.append(os.path.abspath("SO_site-packages"))
import pyperclip
import requests
import json

class proxy():
    def update(self):
        while True:
            data = ''
            urls = ["https://api.proxyscrape.com/?request=getproxies&proxytype=socks4&timeout=10000&ssl=yes"]
            for url in urls:
                data += requests.get(url).text
                self.splited += data.split("\r\n") #scraping and splitting proxies
            time.sleep(600)
    
    def get_proxy(self):
        random1 = random.choice(self.splited) #choose a random proxie
        return random1
    def FormatProxy(self):
	    proxyOutput = {'https' :'socks4://'+self.get_proxy()}
	    return proxyOutput

    def __init__(self):
        self.splited = []
        threading.Thread(target=self.update).start()
        #time.sleep(3)

def getWord(word):
  global r
  global success
  global num
  try:
    #print(str(threading.active_count()) + f" {num} the function got {word}")
    dummy = requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}",proxies=p.FormatProxy()).json()
    if type(dummy) is not dict or dummy["title"] != "API Rate Limit Exceeded":
      if not success:
        r = dummy
      success = True
  except:
    pass
  finally:
    num -= 1

maxthreads = 5
num = 0

p = proxy()

r = []
success = False

recent_value = ''
pyperclip.copy('')
while True:
    tmp_value = pyperclip.paste()
    if tmp_value != recent_value:
      recent_value = tmp_value
      #print('Caught '+tmp_value)
      success = False
      num = 0
      while True:
        if success:
          break
        if num < maxthreads:
          num += 1
          threading.Thread(target=getWord, args=(tmp_value,)).start()
      print(json.dumps(r))
      #print(json.dumps(r, indent=4, sort_keys=True))
      sys.stdout.flush()
    time.sleep(0.1)



