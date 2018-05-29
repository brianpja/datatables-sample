const data = [
    {
      company: 'Cobra, Inc',
      status: 'Pending',
      source: 'Joseph Saddler',
      details: {
        description: 'first row',
        employees: 25,
        contact: {
          address: '123 Johnson Rd',
          phone: 1231231231,
        }
      }
    },
    {
      company: 'Cyberdyne Systems, LLC',
      status: 'Pending',
      source: 'John Connor',
      details: {
        description: 'dogs are cool',
        employees: 50,
        contact: {
          address: '123 Johnson Rd',
          phone: 1231231231,
        }
      }
    },
    {
      company: 'Cloudera',
      status: 'Pending',
      source: 'John Connor',
      details: {
        description: '3 these are some details that will show up in the modal',
        employees: 140,
        contact: {
          address: '123 Johnson Rd',
          phone: 1231231231,
        }
      }
    },
    {
      company: 'Amazon',
      status: 'Big',
      source: 'Bezos',
      details: {
        description: 'full of zombies',
        employees: 10000000,
        contact: {
          address: '123 Johnson Rd',
          phone: 1231231231,
        }
      }
    },
    {
      company: 'Googles',
      status: 'Confirmed',
      source: 'Batman',
      details: {
        description: 'silicon valley giant',
        employees: 2,
        contact: {
          address: '123 Johnson Rd',
          phone: 1231231231,
        }
      }
    },
    {
      company: 'Googles',
      status: 'Confirmed',
      source: 'Batman',
      details: {
        description: 'silicon valley giant',
        employees: 2,
        contact: {
          address: '123 Johnson Rd',
          phone: 1231231231,
        }
      }
    },
    {
      company: 'Cobra, Inc',
      status: 'Pending',
      source: 'Joseph Saddler',
      details: {
        description: 'first row',
        employees: 25,
        contact: {
          address: '123 Johnson Rd',
          phone: 1231231231,
        }
      }
    },
    {
      company: 'Cyberdyne Systems, LLC',
      status: 'Pending',
      source: 'John Connor',
      details: {
        description: 'dogs are cool',
        employees: 50,
        contact: {
          address: '123 Johnson Rd',
          phone: 1231231231,
        }
      }
    },
    {
      company: 'Cloudera',
      status: 'Pending',
      source: 'John Connor',
      details: {
        description: '3 these are some details that will show up in the modal',
        employees: 140,
        contact: {
          address: '123 Johnson Rd',
          phone: 1231231231,
        }
      }
    },
    {
      company: 'Amazon',
      status: 'Big',
      source: 'Bezos',
      details: {
        description: 'full of zombies',
        employees: 10000000,
        contact: {
          address: '123 Johnson Rd',
          phone: 1231231231,
        }
      }
    },
    {
      company: 'Googles',
      status: 'Confirmed',
      source: 'Batman',
      details: {
        description: 'silicon valley giant',
        employees: 2,
        contact: {
          address: '123 Johnson Rd',
          phone: 1231231231,
        }
      }
    },
    {
      company: 'Googles',
      status: 'Confirmed',
      source: 'Batman',
      details: {
        description: 'silicon valley giant',
        employees: 2,
        contact: {
          address: '123 Johnson Rd',
          phone: 1231231231,
        }
      }
    }
];

const tableBody = $('tbody');


createDataRows(data);



const table = $('#my-table').DataTable({
      "paging": true,
      "ordering": false,
      "info": false,
      "searching": true,
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
    tableBody.append(row, spacer);
  }
}

function createCell(str) {
  const retEle = $('<td>').append(str).attr('id', 'custom-td');
  return retEle;
}

function createDetailsCell(obj, index) {
  console.log(index);
  const modalId = `modal${index}`;
  createDetailsModal(obj, index);
  const retEle = $('<td>').attr('id', 'custom-td');
  const anchor = $('<a>').addClass('show-modal').attr('href', `#${modalId}`).append('Details');
  retEle.append(anchor);
  return retEle;
}


function createDetailsModal(obj, index) {
  //create the html of the modal and append to the body of the dom
  // console.log(index)
  // console.log(obj)
  const overlay = $('<div>').addClass('overlay').attr('id', `overlay${index}`);
  const modal = $('<div>').addClass('modal').attr('id', `modal${index}`);
  const close = $('<div>').addClass('close').append('<span>X</span>');
  const content = $('<div>').addClass('modal-content').append(`<p>${obj.description}</p><p>Employees: ${obj.employees}</p>`);
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
  console.log('clicking')
  console.log(e.target.href);
  console.log(e.target.href.indexOf('#modal'))
  const stringIndex = e.target.href.indexOf('#modal')
  const index = e.target.href.slice(stringIndex + 6);

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
