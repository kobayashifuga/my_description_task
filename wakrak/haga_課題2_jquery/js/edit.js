//ホバーしたら選択肢が出てくる
$('body').on('mouseover','.item',function() {
    const index = $(this).index();
    $('.unvisible').eq(index).css('display', 'inline-block');
});
$('body').on('mouseout','.item',function() {
  $('.unvisible').css('display', 'none');
});

//クリックしたら削除
$('body').on('click','.delete-item',function() {
  $(this).parent().parent('.item').remove();
});

//一番上にいく
$('body').on('click','.first-order',function() {
  $(this).parent().parent('.item').insertBefore($(".item").top());
});

//一番下にいく
$('body').on('click','.last-order',function() {
  $(this).parent().parent('.item').insertAfter($('.item').last());
});

//上にいく
$('body').on('click','.minus-order',function() {
    $(this).parent().parent('.item').insertBefore($(this).parent().parent('.item').prev());
});

//下にいく
$('body').on('click','.plus-order',function() {
  $(this).parent().parent('.item').insertAfter($(this).parent().parent('.item').next());
});

//フォームから入力
$(function(){
  $('.item_submit').click(function(){
    const val = $('#textarea').val();  //class(.form-control)だと取得できなかった
    $('#sortable').prepend(
      `<div class="item text-item"><span class="input-text">${val}</span>
        <ul class="editpager clearfix unvisible">
          <li class="first-order">一番上へ</li>
          <li class="minus-order">上へ</li>
          <li class="plus-order">下へ</li>
          <li class="last-order">一番下へ</li>
          <li class="edit-item">編集</li>
          <li class="delete-item">削除</li>
        </ul>
      </div>`
    ),
    $('#textarea').val(''); 
  });
});

//編集する
$('body').on('click','.edit-item',function() {
  const index = $(this).parent().parent('.item').index();
  const thisItem = $('.item').eq(index)
  const text = $('.editpager',$(this).parent().parent('.item')).siblings('.input-text').text();
  $('.input-text',thisItem).html(`<input type="text" id="input" value="${text}">`);
  $('body').on('mouseover','.item',function() {
    $('.unvisible').css('display', 'none');
  });
  $('#input').focus(function(){
    const val = $('#input').val();
  }).blur(function(){
    $('body').on('mouseover','.item',function() {
      const index = $(this).index();
      $('.unvisible').eq(index).css('display', 'inline-block');
    });
    const val = $('#input').val();
    $('#input').replaceWith(
      `${val}`
    )
  })
});

