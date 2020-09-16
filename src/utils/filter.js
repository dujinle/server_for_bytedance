module.exports = {
	filter:function(obj){
		if(obj != null){
			let ret = {};
			for(let key in obj){
				if(typeof(key) != 'string'){
					continue;
				}
				if(key.substring(0,1) == '_'){
					continue;
				}
				ret[key] = obj[key];
			}
			return ret;
		}
		return obj;
	}
}
