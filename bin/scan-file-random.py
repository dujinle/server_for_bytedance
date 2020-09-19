import os
import sys
import random
import re,json, hashlib
from shutil import copyfile
#-*- encoding:utf-8 -*-
def getmd5(name):
	return hashlib.md5(name.encode(encoding='UTF-8')).hexdigest()

def scandir(indir):
	filess = []
	for root,dirs,files in os.walk(indir):
		for fil in files:
			idx = fil.find('.');
			tp = fil[idx:];
			if idx != -1:
				fil = fil[:idx];
			filess.append({'name':fil,'type':tp});
	return filess;

def mysort(b):
	if random.random() > 0.5:
		return True;
	else:
		return False;
def findrandom(fils):
	ret = sorted(fils,key=mysort);
	lens = len(ret);
	idx = 0;
	levelid = 0;
	levels = {}
	while True:
		if idx >= lens:
			break;
		sp = []
		if idx + 3 < lens:
			sp = ret[idx:idx + 3];
		else:
			sp = ret[idx:];
		levels[levelid] = sp;
		levelid = levelid + 1;
		idx = idx + 3;
	lstr = json.dumps(levels,ensure_ascii=False);
	print(lstr);

def print_usage(exe):
	print("Usage : python %s outdir" %(exe));
	sys.exit(-1)

if len(sys.argv) < 2:
	print_usage(sys.argv[0])
elif sys.argv[1] == "--help":
	print_usage(sys.argv[0])
else:
	files = scandir(sys.argv[1]);
	findrandom(files);
