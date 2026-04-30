document.addEventListener('DOMContentLoaded', function() {
    // Configuration - Yahan change kar sakte hain
    const itemsPerPage = 4; // Har page par kitni items dikhani hain
    
    // Elements select karein
    const items = document.querySelectorAll('.item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageNumbersContainer = document.getElementById('pageNumbers');
    const pageInfo = document.getElementById('pageInfo');
    
    // Total pages calculate karein
    const totalPages = Math.ceil(items.length / itemsPerPage);
    let currentPage = 1;
    
    // Function: Specific page ki items dikhayein
    function showPage(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        items.forEach((item, index) => {
            if (index >= startIndex && index < endIndex) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
        
        updatePagination();
    }
    
    // Function: Page numbers buttons banayein
    function createPageNumbers() {
        pageNumbersContainer.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'page-number';
            pageBtn.textContent = i;
            pageBtn.setAttribute('data-page', i);
            
            pageBtn.addEventListener('click', function() {
                currentPage = parseInt(this.getAttribute('data-page'));
                showPage(currentPage);
            });
            
            pageNumbersContainer.appendChild(pageBtn);
        }
    }
    
    // Function: Pagination update karein
    function updatePagination() {
        // Page info update karein
        const startItem = (currentPage - 1) * itemsPerPage + 1;
        const endItem = Math.min(currentPage * itemsPerPage, items.length);
        pageInfo.textContent = `Showing ${startItem} - ${endItem} of ${items.length} items (Page ${currentPage} of ${totalPages})`;
        
        // Previous/Next buttons enable/disable karein
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
        
        // Active page highlight karein
        const pageButtons = document.querySelectorAll('.page-number');
        pageButtons.forEach(btn => {
            const page = parseInt(btn.getAttribute('data-page'));
            if (page === currentPage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Previous button click event
    prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });
    
    // Next button click event
    nextBtn.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' && currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });
    
    // Initialize
    createPageNumbers();
    showPage(currentPage);
});