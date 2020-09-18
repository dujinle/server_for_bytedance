import os
import sys
import re,json, hashlib
from shutil import copyfile
#-*- encoding:utf-8 -*-
def getmd5(name):
	return hashlib.md5(name.encode(encoding='UTF-8')).hexdigest()

def typeof(variate):
	type = None
	if isinstance(variate,int):
		type = "int"
	elif isinstance(variate,str):
		type = "str"
	elif isinstance(variate,float):
		type = "float"
	elif isinstance(variate,list):
		type = "list"
	elif isinstance(variate,tuple):
		type = "tuple"
	elif isinstance(variate,dict):
		type = "dict"
	elif isinstance(variate,set):
		type = "set"
	return type

def loadJson(filename):
	fp = open(filename);
	data = [];
	while True:
		line = fp.readline();
		if line:
			line = line.rstrip("\n");
		else:
			break;
		data.append(line);
	datastr = ''.join(data);
	dataJson = json.loads(datastr);
	return dataJson;

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
	print("Usage : python %s type[level|build|role|menke] ......\
		\nlevel:levelfile imagesdir outdir \
			" %(exe));
	sys.exit(-1)

if len(sys.argv) < 3:
	print_usage(sys.argv[0])
elif sys.argv[1] == "--help":
	print_usage(sys.argv[0])
else:
	if sys.argv[1] == 'level':
		make_level(sys.argv[2],sys.argv[3],sys.argv[4]);
	elif sys.argv[1] == 'build':
		make_build(sys.argv[2],sys.argv[3],sys.argv[4])
