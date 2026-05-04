// Classes ka data
const classesData = [
    { name: "Class 1", subject: "Computer Class" },
    { name: "Class 2", subject: "English Class" },
    { name: "Class 3", subject: "Math Class" },
    { name: "Class 4", subject: "Urdu Class" },
    { name: "Class 5", subject: "Chemistry Class" },
    { name: "Class 6", subject: "Physics Class" },
    { name: "Class 7", subject: "Biology Class" },
    { name: "Class 8", subject: "History Class" },
    { name: "Class 9", subject: "Geography Class" },
    { name: "Class 10", subject: "Science Class" }
];

// Pagination settings
const itemsPerPage = 4; // Har page par 4 classes dikhengi
let currentPage = 1;

const itemsContainer = document.getElementById('itemsContainer');
const pageNumbersElement = document.getElementById('pageNumbers');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

// Total pages calculate karein
const totalPages = Math.ceil(classesData.length / itemsPerPage);

// Items display karna
function displayItems(page) {
    itemsContainer.innerHTML = '';
    
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = classesData.slice(startIndex, endIndex);
    
    itemsToShow.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.subject}</p>
        `;
        itemsContainer.appendChild(itemDiv);
    });
    
    updatePagination();
    updatePageInfo();
}

// Pagination buttons update karna
function updatePagination() {
    // Page numbers create karna
    pageNumbersElement.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.className = i === currentPage ? 'active' : '';
        
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            displayItems(currentPage);
        });
        
        pageNumbersElement.appendChild(pageBtn);
    }
    
    // Previous button enable/disable
    prevBtn.disabled = currentPage === 1;
    
    // Next button enable/disable
    nextBtn.disabled = currentPage === totalPages;
}

// Page info update karna
function updatePageInfo() {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, classesData.length);
    pageInfo.textContent = `Showing ${startItem}-${endItem} of ${classesData.length} classes`;
}

// Event listeners
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayItems(currentPage);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        displayItems(currentPage);
    }
});

// Initial load
displayItems(currentPage);
    
