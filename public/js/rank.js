$( document ).ready(function() {
	initBtn();
	initList();
});
function initBtn() {
	$(document).on('click','.btn-follow',function() {
		$.ajax({
		  type: "PUT",
		  dataType: 'json',
		  url: $(this).prev('form').attr('action'),
		  data: $(this).prev('form').serialize(),
		  success: function(msg){
			  if(msg.status == 'ok')
				location.reload(); 
		  },
		  error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(errorThrown);
		  }
		});
	})
}
function initList() {
	$.ajax({
	  type: "GET",
	  dataType: 'json',
	  url: "/rank/get",
	  success: function(msg){
		  if(msg.status == 'ok')
		  {
		      $(msg.rank).each(function(idx,ele){
			      var obj = $('.text_tr').find('tr').clone();
				  if(msg.is_login)
				  {
					  if(ele["id"] == msg.user_id)
						  $(obj).addClass('text-danger');
					  else
					  {
						  if(ele["id"] == msg.group_id)
						  {
							  var form = $('.text_unfollow').children().clone();
							  var btn = $('.text_unfollow_btn').children().clone();
						  }
						  else
						  {
							  var form = $('.text_follow').children().clone();
							  var btn = $('.text_follow_btn').children().clone();
						  }
						  $(form).find('input').val(ele["id"]).attr('value',ele["id"]);
						  $(form).appendTo($(obj).children('.name'));
						  $(btn).appendTo($(obj).children('.name'));
					  }
				  }
				  $(obj).children('.rank').children('span').text(idx+1);
				  $(obj).children('.name').children('span').text(ele["name"]);
				  $(obj).children('.score').children('span').text(numberWithCommas(ele["score"]));
				  $(obj).children('.level').children('span').text(numberWithCommas(ele["level"]));
				  $(obj).children('.last').children('span').text(ele["last_datetime"]);
				  $(obj).appendTo('.block_tr');
			  });
			  if(msg.rank.length > 0)
				  $('.block_rank').show();
			  else
				  $('.block_no_user').show();
		  }
		  else
		  {
			  
		  }
	  },
	  error: function(XMLHttpRequest, textStatus, errorThrown) {
		  //location.reload(); 
	  }
	});
}
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}