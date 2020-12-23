const editForm = document.querySelector('#editSlide');


editForm.addEventListener('submit', function(e) { 
        let uploadImgs   = document.querySelector('#slideImgs').files.length;
        let existingImgs = document.querySelectorAll('.imageDeleteCheckbox').length;
        let imgDeletions = document.querySelectorAll('.imageDeleteCheckbox:checked').length;
        let imgsTotal    = existingImgs - imgDeletions + uploadImgs;   
        if (imgsTotal > 4 ) {
            e.preventDefault();
            let amount = imgsTotal - 4;
    
            alertErr.prepend(`You need to remove at least ${amount} or more image${amount !== 1 ? 's' : ''}`);
            alertErr.style.color = 'red';
        }   
})

