const limit = 1000 + 1;
let countChar = document.querySelector('#count');
const descriptionVaga = document.querySelector('#desc');

quill.on('text-change', function (delta, old, source) {
    descriptionVaga.value = document.querySelector('.ql-editor').innerHTML;
    let currentValue = limit - (quill.getLength());
    countChar.innerHTML = currentValue;
    if(currentValue < 0){
        countChar.classList.add('limit-exceeded');
    } else{
        countChar.classList.remove('limit-exceeded');
    }
        
    if (quill.getLength() <= limit) {
        return;
    }
    const { ops } = delta;
    let updatedOps;
    if (ops.length === 1) {
        // text is inserted at the beginning
        updatedOps = [{ delete: ops[0].insert.length }];
    } else {
        // ops[0] == {retain: numberOfCharsBeforeInsertedText}
        // ops[1] == {insert: "example"}
        updatedOps = [ops[0], { delete: ops[1].insert.length }];
    }
    quill.updateContents({ ops: updatedOps });
});