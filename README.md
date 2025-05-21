---
title: Glassdoor Data Scraper
description: A simple JavaScript tool to scrape job listing data from a web page by selecting structured HTML elements with job IDs. It extracts job title, company, location, salary (with normalization), and description — then saves the data to a local `.json` file.
date: 2025-04-15
category: Development
site: 
author:
 name: Juan Carlos de Borja
 role: Developer and Author
 avatar: https://github.com/ttv-voidgg.png  
---


# 🧠 Job Listing Scraper (DOM Extractor)

A simple JavaScript tool to scrape job listing data from a web page by selecting structured HTML elements with job IDs. It extracts job title, company, location, salary (with normalization), and description — then saves the data to a local `.json` file.

---

## 🚀 Features

- 📄 Extracts job title, company, location, description, and salary.
- 💵 Parses salary strings (supports hourly and annual formats).
- 📦 Exports extracted data to a downloadable `jobs.json` file.
- 🔁 Auto-clicks "Load more" buttons to scrape all available jobs.
- ⚡ 100% client-side — run in the browser console.

---

## 🧪 How to Use

1. **Open a job listing page** where each job is in a `<li>` with a `data-jobid`.
2. Open the **browser console** (F12 or right-click > Inspect > Console).
3. Paste the script and hit **Enter**.
4. The script will scroll through and extract all job listings.
5. A `jobs.json` file will automatically download to your system.

---

## 📚 Data Structure

Each job object includes:

```json
{
  "title": "Frontend Developer",
  "company": "Tech Corp",
  "location": "Winnipeg, MB",
  "salary": {
    "min": 60000,
    "max": 80000
  },
  "description": "Join our agile team building modern web apps."
}
