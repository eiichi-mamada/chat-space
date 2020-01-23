$(function(){
  function buildHTML(message){
    var html_info =
      `<div class="message__info">
        <p class="message__info--name">
          ${message.user_name}
        </p>
        <p class="message__info--time">
          ${message.created_at}
        </p>
      </div>`
    var html_content =
      `<p class="message__content">
        ${message.content}
      </p>`
    var html_image =
      `<img src=${message.image} >`

   if ( message.image ) {
     var html =
      `<div class="message" data-message-id=${message.id}>` +
        html_info +
        html_content +
        html_image +
      `</div>`
   } else {
     var html =
      `<div class="message" data-message-id=${message.id}>` +
        html_info +
        html_content +
      `</div>`
   };
   return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url, 
      type: 'POST',  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.view').animate({ scrollTop: $('.view')[0].scrollHeight});
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $(".submit-btn").removeAttr("disabled");
    });
  })

  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.view').animate({ scrollTop: $('.view')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".submit-btm").prop("disabled", false);
      }
    })
    .fail(function() {
      console.log('error');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 5000);
  }
});