import { runRealScraping } from './real-scraper';

async function main() {
  console.log('Starting real data scraping from https://lncart.modoo.at/?link=0stkad99...');
  
  const result = await runRealScraping();
  
  if (result.success) {
    console.log(`\n✅ Success! Scraped ${result.count} real articles from the website`);
    console.log(`Message: ${result.message}`);
  } else {
    console.log(`\n❌ Failed: ${result.message}`);
  }
  
  process.exit(0);
}

main().catch(console.error);