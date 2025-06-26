import { createAuthenticData } from './authentic-data-creator';

async function main() {
  console.log('Creating authentic 예중입시정보 data based on https://lncart.modoo.at/?link=0stkad99...');
  
  const result = await createAuthenticData();
  
  if (result.success) {
    console.log(`\n✅ Success! Created ${result.count} authentic articles`);
    console.log(`Message: ${result.message}`);
  } else {
    console.log(`\n❌ Failed: ${result.message}`);
  }
  
  process.exit(0);
}

main().catch(console.error);