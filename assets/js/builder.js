$(document).ready(function () {
  //$('[data-toggle="tooltip"]').tooltip()
  $('[data-toggle="popover"]').popover();

  $('label.tree-toggler').click(function toggleTree(e) {
    e.preventDefault();
    $(this).toggleClass('toggleIcon');
    $(this).parent().children('ul.tree').toggle(150);
  });

  //$('label.tree-toggler').trigger('click');
  $('li:has(ul) > input.toggle-symbol').on('change', updateChildState);
  
  $('input.toggle-symbol')
    .on('change', updateParentState)
    .on('updateParent', updateParentState)

  

  $('#btn-toggleSymbols').on('click', toggleAllSymbols);
  $('#btn-toggleDefines').on('click', toggleAllDefines);

  $('#btn-toggleDefault').on('click', setDefaults);
  $('#btn-toggleDefault').trigger('click');

  $('#btn-compile').on('click', function() {
    var obj = {
      symbols: getSymbols(),
      defines: getDefines()
    };
    console.log(obj);
  })
});

var symbolsToggled = true, definesToggled = true, definesDefaultToggled = true;
function setDefaults() {
  if (!definesToggled) {
    $('#btn-toggleDefines').trigger('click'); // clear if toggleAll'd
    definesDefaultToggled = true;
  }
  $('#defines').find('input[default="true"]').prop("checked", definesDefaultToggled);
  definesDefaultToggled = !definesDefaultToggled;
}

function toggleAllSymbols() {
  $('#symbols').find('input.toggle-symbol').prop("checked", symbolsToggled);
  symbolsToggled = !symbolsToggled;
}

function toggleAllDefines() {
  $('#defines').find('input.toggle-defines').prop("checked", definesToggled);
  definesToggled = !definesToggled;
}

function updateChildState() {
  console.log('update child ', this.value);
  if(!$(this).prop('indeterminate')) {
    $(this)
      .siblings('ul')
      .find('input.toggle-symbol')
      .prop('checked', $(this).prop('checked'))
  }
}
/**
 * When a checkbox has been updated, update state of parent
 */
function updateParentState() {
  var parentList = $(this).closest('ul');
  var siblings = parentList.find('li > input.toggle-symbol');
  var parentCheckbox = parentList.siblings('input.toggle-symbol');

  if (parentCheckbox && parentCheckbox.length > 0) {
    var num = siblings.length;
    var checked = siblings.filter(':checked').length;

    parentCheckbox
      .prop('checked', checked === num)
      .prop('indeterminate', checked < num)
      .trigger('updateParent');
  }
}


function loadState(opts) {

  // Set symbols
  $('input.toggle-symbol').prop('checked', false);
  opts.symbols.forEach(function(name) {
    if (name.length) {
      $('input.toggle-symbol[value="'+name+'"]')
        .prop('checked', true);
    }
  });

  $('input.toggle-symbol.has-children').trigger('updateParent');

  // Set defines
  Object.keys(opts.defines)
    .forEach(function(name) {
      $('input.toggle-symbol[value="'+name+'"]')
        .prop('checked', opts.defines[name])
        .trigger('change');
    });
}


/**
 * Returns array of selected symbols
 * @return {Array} Selected symbols
 */
function getSymbols() {
  var items = $('input.toggle-symbol:checked');
  var arr = [];
  items.each(function() { 
    if (this.value) {
      arr.push(this.value);
    }
  });
  return arr;
}


/**
 * Returns array of selected Definitions
 * @return {Array} Selected defines
 */
function getDefines() {
  var items = $('input.toggle-defines');
  var obj = {};
  items.each(function() {
    obj[this.value] = this.checked;
  });
  return obj;
}