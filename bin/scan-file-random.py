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
			if idx != -1:
				fil = fil[:idx];
			filess.append(fil);
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

def make_level(levelfile,imagesdir,outdir):
	jdata = loadJson(levelfile);
	if not os.path.exists(outdir):
		os.mkdir(outdir);
	for key in jdata:
		dts = jdata[key];
		level = {'question':[]};
		for item in dts:
			ques = {
				'words':None,
				'ImageType':1,
				'imageUrl':None
			};
			source = os.path.join(imagesdir,item + '.png');
			md5name = getmd5(item);
			target = os.path.join(outdir,md5name + '.png')
			try:
				copyfile(source, target)
			except IOError as e:
				print("Unable to copy file. %s" % e)
				sys.exit(1)
			except:
				print("Unexpected error:", sys.exc_info())
				sys.exit(1)
			words = [];
			for wd in item:
				words.append(wd);
			ques['words'] = words;
			ques['imageUrl'] = 'abc&&' + target;
			level['question'].append(ques);
		levelname = 'level_' + key + '.json';
		lpath = os.path.join(outdir,levelname);
		lstr = json.dumps(level,ensure_ascii=False);
		with open(lpath,'w',encoding='utf8') as f:
			f.write(lstr)
		print('make level:',lpath,' make success');


def make_build(levelfile,imagesdir,outdir):
	jdata = loadJson(levelfile);
	if not os.path.exists(outdir):
		os.mkdir(outdir);
	idx = 0;
	builds = [];
	for dts in jdata:
		dts['id'] = idx;
		idx = idx + 1;

		images = [];
		for item in dts['images']:
			source = os.path.join(imagesdir,item + '.png');
			md5name = getmd5(item);
			target = os.path.join(outdir,md5name + '.png')
			try:
				copyfile(source, target)
			except IOError as e:
				print("Unable to copy file. %s" % e)
				sys.exit(1)
			except:
				print("Unexpected error:", sys.exc_info())
				sys.exit(1)
			images.append(target);
		dts['images'] = images;
		dts['ImageType'] = 1;
		builds.append(dts);

	levelname = 'outfile.json';
	lpath = os.path.join(outdir,levelname);
	lstr = json.dumps(builds,ensure_ascii=False);
	with open(lpath,'w',encoding='utf8') as f:
		f.write(lstr)
	print('make build:',lpath,' make success');

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
