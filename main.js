const data = [
    {
      company: 'Cobra, Inc',
      status: 'Pending',
      source: 'Joseph Saddler',
      details: '1 these are some details that will show up in the modal'
    },
    {
      company: 'Cyberdyne Systems, LLC',
      status: 'Pending',
      source: 'John Connor',
      details: 'dogs are cool'
    },
    {
      company: 'Cloudera',
      status: 'Pending',
      source: 'John Connor',
      details: '3 these are some details that will show up in the modal'
    },
    {
      company: 'Amazon',
      status: 'Big',
      source: 'Bezos',
      details: 'filled with zombies'
    }
];

const tableBody = $('tbody');


createDataRows(data);



const table = $('#my-table').DataTable({
      "paging": false,
      "ordering": false,
      "info": false,
      "searching": false,
      headerCallback: function( thead, data, start, end, display ) {
        $(thead).find('th').attr('id', 'custom-th');
      },
      fixedColumns:   {
            heightMatch: 'none'
      },
      // createdRow: function(row) {
      //   console.log(row);
      //   $(row).attr('id', 'custom-tr');
      //   $(row).find('td').attr('id', 'custom-td')
      // }
    });

// $(document).ready( function () {
//     table.DataTable({
//       "paging": false,
//       "ordering": false,
//       "info": false,
//       "searching": false,
//       "headerCallback": function( thead, data, start, end, display ) {
//         console.log(thead);
//         $(thead).find('th').addClass('custom-th')
//       }
//     });
// } );



function createDataRows(array) {
  for (let i = 0; i < array.length; i++) {
    const row = $('<tr>').attr('id', 'custom-tr');
    const spacer = $('<tr>').attr('id', 'spacer');
    const blankCell = createCell('');
    const company = createCell(array[i].company);
    const status = createCell(array[i].status);
    const source = createCell(array[i].source);
    const details = createDetailsCell(array[i].details, i);
    row.append(company, status, source, details);
    spacer.append(createCell(''), createCell(''), createCell(''), createCell(''));
    tableBody.append(row);
  }
}

function createCell(str) {
  const retEle = $('<td>').append(str).attr('id', 'custom-td');
  return retEle;
}

function createDetailsCell(str, index) {
  console.log(index);
  const modalId = `modal${index}`;
  createDetailsModal(str, index);
  const retEle = $('<td>').attr('id', 'custom-td');
  const anchor = $('<a>').addClass('show-modal').attr('href', `#${modalId}`).append('Details');
  retEle.append(anchor);
  return retEle;
}

const body = $('#body');

function createDetailsModal(str, index) {
  //create the html of the modal and append to the body of the dom

  const overlay = $('<div>').addClass('overlay').attr('id', `overlay${index}`);
  const modal = $('<div>').addClass('modal').attr('id', `modal${index}`);
  const close = $('<div>').addClass('close').append('<span>X</span>');
  const content = $('<div>').addClass('modal-content').append(`<p>${str}</p>`);
  modal.append(close, content);
  overlay.append(modal);
  $('#my-table').append(overlay);
}



var $modal = $('.modal'),
    $overlay = $('.overlay'),
    $showModal = $('.show-modal'),
    $close = $('.close');

/*show modal and set dimensions based on window */
$showModal.on('click', function(e){
  e.preventDefault();
  console.log(e.target);
  const index = e.target.href.slice(-1);
  console.log(index);

  const overlay = $(`#overlay${index}`);

  var windowHeight = $(window).height(),
      windowWidth = $(window).width(),
      modalWidth = windowWidth/2;

  overlay.show();
  $modal.css({
    'width' : modalWidth,
    'margin-left' : -modalWidth/2
  });
});
/*close on click of 'x' */
$close.on('click', function(){
  $overlay.hide();
});
/* close on click outside of modal */
$overlay.on('click', function(e) {
  if (e.target !== this) return;
  $overlay.hide();
});
