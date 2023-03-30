$(function (){
    const TODAY = new Date();
    const formattedTODAY = TODAY.toISOString().slice(0, 10);

    var $transactions = $('#TransactionTable');
    var $amount = $('#amount')

    function addTransaction(transac){
        $transactions.append(
                            `<tr>
                                <td> ${transac.amount} </td>
                                <td><button data-id=${transac.id} class='remove'> Update </button></td>
                                <td><button data-id=${transac.id} class='remove'> Delete-X </button></td>
                            </tr>`
                            );
    }

    // Initialized web page request
    $.ajax({
        type: 'GET',
        url: `/transacal/getTransactionsByDate/${formattedTODAY}`,
        success: function(transacs){
            console.log("LOGIN IN :" + formattedTODAY);
            $.each(transacs, function(i, transac){
                addTransaction(transac);
            });
        },
        error: function(error){
            console.log("LOGIN IN :" + formattedTODAY);
            console.log(`An error occurred: ${error}`)
        }
    });


    // Adding a record
    $('#addTransactionBtn').on('click', function(){
//        let month = today.getMonth() + 1;
//        let day = today.getDate();
//        let year = today.getFullYear();
//        let formattedDate = month + '/' + day + '/' + year;
//        let formattedDate = TODAY.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'});
        console.log("Add record on: " + TODAY)

        var transac = {type: "togo", amount:$amount.val()}

        $.ajax({
            type: "POST",
            url: '/transacal/addTransaction',
            contentType: "application/json",
            data: JSON.stringify(transac),
            success: function (newTransac) {
                addTransaction(transac)
                console.log("add: " + newTransac.id);
            }
        });
    });

    // Delete a record
    $transactions.delegate('.remove', 'click', function(){
        var $tr = $(this).closest('tr');
        var delete_id = $(this).attr('data-id');
        console.log(`Delete id is: ${delete_id}`)
        var myurl = `/transacal/delete/${delete_id}`;
        $.ajax({
            type: 'DELETE',
            url: myurl,
            success: function(){
                $tr.fadeOut(300, function(){
                    $(this).remove();
                });
            }
        });
    });
});