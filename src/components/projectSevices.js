export const submitProjectDetails = async (formData) => {
    try {
        const response = await fetch('http://localhost:5000/api/addProject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }
        return response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const fetchProjects = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/projectList');
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
    }
};


export const updateProjectDetails = async (project) => { try { const response = await fetch(`${'http://localhost:5000/api/updateProject'}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(project) }); if (!response.ok) { throw new Error('Failed to update project'); } return response.json(); } catch (error) { console.error('Error updating project:', error); return null; } };

export const deleteProject = async (projectId) => { try { const response = await fetch('http://localhost:5000/api/deleteProject', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: projectId }) }); if (!response.ok) { throw new Error('Failed to delete project'); } return 'Project deleted successfully!'; } catch (error) { console.error('Error deleting project:', error); return 'Error deleting project'; } };