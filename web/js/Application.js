/*
 * Handles Exptype for addition and removal.  
 */

var $collectionHolder;

// setup an "add a tag" link
var $addRNASeqLink = $('<a href="#" class="add_rnaseq_link">Add an RNASeq Experiment</a>');
var $newLinkLi = $('<div></div>');

jQuery(document).ready(function() {
    // Get the div that holds the collection of rnaseqs
    $collectionHolder = $('div.rnaseqs');

    // add the "add an RNASeq Experiment" anchor and div to the rnaseqs div
    $collectionHolder.append($newLinkLi);

    // count the current form inputs we have (e.g. 2), use that as the new
    // index when inserting a new item (e.g. 2)
    $collectionHolder.data('index', $collectionHolder.find(':input').length);

    $('#expType_drop').on('change', function(e) {
        // prevent the link from creating a "#" on the URL
        e.preventDefault();

        var optionSelect = $('option:selected', this).text();
        // Remove old ExpType.
        $('.exptype-form-div').remove();
        // Find correct type and run appropriate form.
        if (optionSelect == 'RNASeq') {
            addRNASeqForm($collectionHolder, $newLinkLi);
        }
    });
});

function addRNASeqForm($collectionHolder, $newLinkLi) {
    // Get the data-prototype explained earlier
    var prototype = $collectionHolder.data('prototype');

    // get the new index
    var index = $collectionHolder.data('index');

    // Replace '__name__' in the prototype's HTML to
    // instead be a number based on how many items we have
    var newForm = prototype.replace(/__name__/g, index);

    // increase the index with one for the next item
    $collectionHolder.data('index', index + 1);

    // Display the form in the page in an li, before the "Add a tag" link li
    var $newFormLi = $('<div class="exptype-form-div"><h3>RNA Seq Experiment</h3></div>').append(newForm);
    $newLinkLi.before($newFormLi);
}