/*
 * [ OBJECT NULL CHECK ]
 *
*/
function isNull(obj){
	if(obj == null || obj == undefined || obj == ""){
		return true;
	}
	return false;
}