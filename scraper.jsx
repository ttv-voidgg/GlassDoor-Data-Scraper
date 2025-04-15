function extractJobs() {
  const jobs = [];
  document.querySelectorAll('li[data-jobid]').forEach(li => {
    const jobId = li.getAttribute('data-jobid');

    const rawSalary = document.getElementById(`job-salary-${jobId}`)?.textContent.trim();
    const salary = parseSalaryRange(rawSalary);

    const job = {
      title: document.getElementById(`job-title-${jobId}`)?.textContent.trim(),
      company: document.getElementById(`job-employer-${jobId}`)?.textContent.trim(),
      location: document.getElementById(`job-location-${jobId}`)?.textContent.trim(),
      salary, // { min: X, max: Y }
      description: document.getElementById(`job-description-${jobId}`)?.textContent.trim(),
    };

    jobs.push(job);
  });

  console.log(`Extracted ${jobs.length} jobs`);

  saveJobsToFile(jobs);
  return jobs;
}

function parseSalaryRange(salaryStr) {
  if (!salaryStr) return null;

  const isHourly = /hour/i.test(salaryStr);
  const isK = /k/i.test(salaryStr);

  // Match formats like: $65K, $50,000, $30 - $40/hour, $70K - $90K
  const matches = salaryStr.match(/\$?([\d,.]+)(?:\s*[-to–]+\s*\$?([\d,.kK]+))?/i);
  if (!matches) return { min: null, max: null };

  let min = normalizeSalary(matches[1], isK);
  let max = matches[2] ? normalizeSalary(matches[2], isK) : min;

  if (isHourly) {
    min *= 2080;
    max *= 2080;
  }

  return { min, max };
}

function normalizeSalary(value, isK = false) {
  value = value.toLowerCase().replace(/,/g, '').replace('k', '');
  let num = parseFloat(value);
  if (isNaN(num)) return null;

  return isK || /k/i.test(value) ? num * 1000 : num;
}

function saveJobsToFile(jobs) {
  const blob = new Blob([JSON.stringify(jobs, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'jobs.json';
  link.click();
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

    if (!button || button.offsetParent === null) {
      clearInterval(intervalId);
      extractJobs();
      alert('✅ Reached the end of the job list!');
      return;
    }

    if (button.getAttribute('data-loading') === 'false') {
      clickLoadMoreButton();
    } else {
      console.log('Waiting for jobs to load...');
    }
  }, interval);
}

loadAllJobs(); // 🚀 Start it
