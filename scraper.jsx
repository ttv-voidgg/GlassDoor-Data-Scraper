function extractJobs() {
  const jobs = [];
  document.querySelectorAll('li[data-jobid]').forEach(li => {
    const jobId = li.getAttribute('data-jobid');

    const job = {
      jobId,
      title: document.getElementById(`job-title-${jobId}`)?.textContent.trim(),
      company: document.getElementById(`job-employer-${jobId}`)?.textContent.trim(),
      location: document.getElementById(`job-location-${jobId}`)?.textContent.trim(),
      salary: document.getElementById(`job-salary-${jobId}`)?.textContent.trim(),
      description: document.getElementById(`job-description-${jobId}`)?.textContent.trim(),
    };

    jobs.push(job);
  });
  
  console.log(`Extracted ${jobs.length} jobs`);

  // Save jobs in a JSON file
  saveJobsToFile(jobs);

  return jobs;
}

function saveJobsToFile(jobs) {
  const blob = new Blob([JSON.stringify(jobs, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'jobs.json';  // Name the file
  link.click();  // Trigger the download
  console.log('Jobs saved to jobs.json');
}

function clickLoadMoreButton() {
  const button = document.querySelector('[data-test="load-more"]');
  if (button && button.getAttribute('data-loading') === 'false') {
    button.click();
    console.log('Clicked "Show more jobs"...');
    return true;
  }
  return false;
}

async function loadAllJobs(interval = 100) {
  const intervalId = setInterval(() => {
    const button = document.querySelector('[data-test="load-more"]');

    // If no button, or it's hidden/gone, assume end of list
    if (!button || button.offsetParent === null) {
      clearInterval(intervalId);
      extractJobs(); // final extract if needed
      alert('✅ Reached the end of the job list!');
      return;
    }

    // If button is ready to click
    if (button.getAttribute('data-loading') === 'false') {
      clickLoadMoreButton();
    } else {
      console.log('Waiting for jobs to load...');
    }
  }, interval);
}

loadAllJobs(); // 🚀 Start it
