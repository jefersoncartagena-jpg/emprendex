document.addEventListener('DOMContentLoaded', () => {
    console.log('EMPRENDEX platform loaded. Ready for interaction!');

    // --- 1. Navigation Highlighting ---
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Prevent default link action
            e.preventDefault(); 
            
            // Remove 'active' class from all
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add 'active' class to the clicked item
            e.target.classList.add('active');
            
            // Log the navigation
            console.log(`Navigating to: ${e.target.textContent}`);
        });
    });

    // --- 2. Post Click Listener (Simulation) ---
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach(card => {
        card.addEventListener('click', () => {
            const postId = card.getAttribute('data-post-id');
            // In a real application, this would open a detailed view of the post.
            console.log(`Clicked on Post ID: ${postId}. Opening post detail...`);
        });
    });

    // --- 3. Simple Search Simulation ---
    const searchInput = document.querySelector('.search-bar-feed input');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = e.target.value.trim();
            if (searchTerm) {
                // In a real application, this would filter the posts.
                alert(`Simulating search for: "${searchTerm}"`);
                e.target.value = ''; // Clear input
            }
        }
    });

    // Add more advanced interactivity here (e.g., loading data, liking posts, commenting)
});