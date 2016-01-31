jQuery(function($) {
	
// Validation
	
	$("#updateForm").validate({
							
/*	    invalidHandler: function(form, validator) {
									$('label.error').html('');
		},*/
		rules: {
				  name: {
						  required: true
				  },
				  email: {
						  required: true,
						  email: true
				  },
				  subject: {
						  required: true
				  },
				  message: {
						  required: true
				  }
				  
		},// rules

		messages: {
				  name: {
						  required: 'Please enter name'
				  },
				  email: {
						  required: 'Please enter email',
						  email: 'Please enter valid email'
				  },
				  subject: {
						  required: 'Please enter subject'
				  },
				  option: {
						  required: 'Please select a subscription'
				  }
		},// messages
		submitHandler: function(form) {
		   	
			var formData = $(form).serialize();

			var data = {
			    formname: $("#form-name").val(),
			    formemail: $("#form-email").val(),
			    formsubject: $('#form-subject').val(),
			    formoption: $("#form-option").val()
			};
			$.ajax({
			    type: "POST",
			    url: "email.php",
			    data: data,
			    success: function(){
			   		$('#contact-wrap').fadeOut();
					$('#success-wrap').fadeIn(300, function(){
						$(this).delay(15000).fadeOut(300, function(){
							$('#main-wrap').show();
					   });
					});
			    }
			});

		}

	});// validate
	
	$('#email').focus(function(){
	  		var cur_val = $(this).val();
			if (cur_val != ''){
				
				$(this).val('');	
			}
	  });

	$('#email').blur(function(){
	  		var cur_val = $(this).val();
			if (cur_val == ''){
				
				$(this).val('Enter your e-mail address');	
			}
	  });


	$('#updateForm input, #updateForm textarea').focus(function() {
		$('.contact-section .contact-form-in').css({'top' : '-32px'});
	})
	$('#updateForm input, #updateForm textarea').blur(function() {
		$('.contact-section .contact-form-in').css({'top' : '0'});
	})


 });