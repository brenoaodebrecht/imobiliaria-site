$(function () {
  // Accordion das perguntas frequentes.
  $('.faq-question').on('click', function () {
    const $button = $(this);
    const $answer = $button.next('.faq-answer');

    $('.faq-answer').not($answer).stop(true, true).slideUp(250);
    $('.faq-question').not($button).removeClass('open');

    $button.toggleClass('open');
    $answer.stop(true, true).slideToggle(250);
  });

  // Entrada suave dos cards.
  $('.service-detail').each(function (index) {
    const $card = $(this);
    $card.css({ opacity: 0, transform: 'translateY(20px)' });

    setTimeout(function () {
      $card.animate({ opacity: 1 }, 450);
      $card.css('transform', 'translateY(0)');
    }, index * 90);
  });

  // Voltar ao topo.
  const $top = $('#back-to-top');
  $(window).on('scroll', function () {
    $top.toggleClass('visible', $(window).scrollTop() > 450);
  });

  $top.on('click', function () {
    $('html, body').stop().animate({ scrollTop: 0 }, 600);
  });

  // Scroll suave para âncoras da página.
  $('a[href^="#"]').on('click', function (event) {
    const target = $(this).attr('href');
    if (target !== '#' && $(target).length) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: $(target).offset().top - 90
      }, 550);
    }
  });
});
