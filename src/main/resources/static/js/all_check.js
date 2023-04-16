$(function(){
	
	$('#all_check_key').click(function(){

		//▼#all_check_key　をクリックしたとき
		if($('#all_check_key').is(':checked')){
			//*****チェックつけた時の動作*****
			//tbodyの中の、一番左のtdの中のcheckboxを全てチェックする
			$('td:first-child input').prop('checked',true);
		}else{
			//*****チェック外した時の動作*****
			//一番左のtdの中のcheckboxを全てチェックはずす
			$('td:first-child input').prop('checked',false);
		};
	
    });
	
});