$( document ).ready(function() {
	initBtn();
});
function initBtn() {
	$('#submit').click(function() {
		var myform = $("#form")[0];
		if(myform.checkValidity())
			$.ajax({
			  type: "POST",
			  dataType: 'json',
			  url: $('#form').attr('action'),
			  data: $("#form").serialize(),
			  success: function(msg){
				  if(msg.status == 'ok')
					location.reload(); 
				  else
				  {
					  $('.block_error .content').text('');
					  $('.block_error').show();
					  $(msg.msg).each(function(idx,ele){
						  $('.text_msg').children().clone().text(ele).appendTo('.block_error .content');
					  })
				  }
			  },
			  error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(errorThrown);
			  }
			});
		else
			$(":submit").click();
	})
	
}