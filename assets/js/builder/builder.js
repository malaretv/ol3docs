    $(document).ready(function () {
      console.log('test');
      $('[data-toggle="popover"]').popover({
        trigger: "click",
        placement: "right",
        animation: "true"
      });

      $('label.tree-toggler').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('toggleIcon');
        $(this).parent().children('ul.tree').toggle(300);
      });
      $('label.tree-toggler').trigger('click');

      $('input[type="checkbox"]').on('click', function (e) {
        if ($(this).is(':checked')) {
          $(this).parent().find('input[type="checkbox"]').prop("checked", true);
        } else {
          $(this).parent().find('input[type="checkbox"]').prop("checked", false);
        }
      });
      var symbolsToggled = true, definesToggled = true, definesDefaultToggled = true;
      $('#btn-toggleSymbols').on('click', function () {
        $('#symbols').find('input[type="checkbox"]').prop("checked", symbolsToggled);
        symbolsToggled = !symbolsToggled;
      });
      $('#btn-toggleDefines').on('click', function () {
        $('#defines').find('input[type="checkbox"]').prop("checked", definesToggled);
        definesToggled = !definesToggled;
      });
      $('#btn-toggleDefault').on('click', function () {
        if (!definesToggled) {
          $('#btn-toggleDefines').trigger('click'); // clear if toggleAll'd
          definesDefaultToggled = true;
        }
        $('#defines').find('input[default="true"]').prop("checked", definesDefaultToggled);
        definesDefaultToggled = !definesDefaultToggled;
      });
      $('#btn-toggleDefault').trigger('click');

      $('#btn-compile').on('click', function() {
        //console.log($('form#compile'));
        alert("Let's get this working, ok?")
      });
    });