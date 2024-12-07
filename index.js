const TARGET = 'BIKER' //use 5 letter word
var word_rows = {
        0:{'word':[],'status':'draft','length':5},
        1:{'word':[],'status':'draft','length':5},
        2:{'word':[],'status':'draft','length':5},
        3:{'word':[],'status':'draft','length':5},
        4:{'word':[],'status':'draft','length':5}
    }

$(document).ready(function(){
    $('.alert-success').hide();
})
function checkMatch(word){
    var target_array = TARGET.split('');
    var correctIndex = [];
    var WrongIndex = [];
    target_array.forEach((char, index) => {
        const matchingIndex = word.indexOf(char); // Find the index of the character in array1
        if (matchingIndex !== -1) {
            if (matchingIndex === index) {
                correctIndex.push(matchingIndex);
            } else {
                WrongIndex.push(matchingIndex);
            }
        }
    });
    return [correctIndex,WrongIndex];
}
function clickKey(val){
    var self = this;
    if(val == 'back'){
        var removed = false
        for(i=4;i>=0;i--){
            var row = word_rows[i]; // get word row reversed by for loop
            if(row.word.length > 0 && !removed && row.status != 'done'){
                row.word.pop(); // pop last value from array
                $($('.wordRow'+String(i)).children()[row.word.length]).children().html('') // remove from html
                removed = true;
                if(row.word.length == 0){
                    row.status = 'draft' // make draft state of the row
                }
            }
        }
    }
    else if(val == 'enter'){

    }
    else{
        var added = false
        $.each(word_rows, function(key, value){
            if(value.word.length < 5 && !added){
                value.word.push(val); // add value to the array
                value.status = 'pending'; // state to pending
                $($('.wordRow'+String(key)).children()[value.word.length -1]).children().html(val) // add to html
                added = true;
                if(value.word.length == 5){
                    var indexes = self.checkMatch(value.word)
                    correctIndex = indexes[0]
                    wrongIndex = indexes[1]
                    correctIndex.forEach((i, index) => {
                        $($('.wordRow'+String(key)).children()[i]).children().addClass('bg-success')// add to html
                    });
                    wrongIndex.forEach((i, index) => {
                        console.log(i, index)
                        $($('.wordRow'+String(key)).children()[i]).children().addClass('bg-warning')// add to html
                    });
                    value.status = 'done'
                    if(correctIndex.length == 5){
                        $('.alert-success').show(1000);
                    }
                }
            }
        });
    }
}
