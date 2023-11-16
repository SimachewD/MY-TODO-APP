$(document).ready(function(){
    $('#frm').on('submit', function(e){
        e.preventDefault();
        console.log('Form submitted');

        var item = $('#itemText');
        var todo = { item: item.val() };

        console.log('Sending AJAX request:', todo);
        // Clear the form after submission
        item.val('');

        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            success: function(data){
                location.reload();
                console.log('AJAX request successful:', data);
            },
            error: function(error){
                console.log('AJAX request failed:', error);
            }
        });
    });

 // Add a click event listener to the list items
 $('li').on('click',  function(){

    // Get the item to delete from the clicked list item
    var itemToDelete = $(this).text().replace(/ /g, "-");

    console.log('Deleting item:', itemToDelete);

    // Send AJAX DELETE request
    $.ajax({
        type: 'DELETE',
        url: '/todo/' + encodeURIComponent(itemToDelete), // Update the URL with the item to delete
        success: function(data){
            console.log('DELETE request successful:', data);
            location.reload();
        }
    });
});

});
