// Category filtering
const categoryPills = document.querySelectorAll('.category-pill');
const forumPosts = document.querySelectorAll('.forum-post');

categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
        // Remove active class from all pills
        categoryPills.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked pill
        pill.classList.add('active');
        
        const category = pill.getAttribute('data-category');
        
        // Filter posts
        forumPosts.forEach(post => {
            if (category === 'all') {
                post.style.display = 'block';
                setTimeout(() => {
                    post.style.opacity = '1';
                    post.style.transform = 'translateX(0)';
                }, 10);
            } else {
                const postCategory = post.getAttribute('data-category');
                if (postCategory === category) {
                    post.style.display = 'block';
                    setTimeout(() => {
                        post.style.opacity = '1';
                        post.style.transform = 'translateX(0)';
                    }, 10);
                } else {
                    post.style.opacity = '0';
                    post.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        post.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Search functionality
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    forumPosts.forEach(post => {
        const title = post.querySelector('.post-title').textContent.toLowerCase();
        const description = post.querySelector('.post-description').textContent.toLowerCase();
        const username = post.querySelector('.username').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm) || username.includes(searchTerm)) {
            post.style.display = 'block';
            setTimeout(() => {
                post.style.opacity = '1';
                post.style.transform = 'translateX(0)';
            }, 10);
        } else {
            post.style.opacity = '0';
            post.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                post.style.display = 'none';
            }, 300);
        }
    });
});

// Add transition styles
forumPosts.forEach(post => {
    post.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});