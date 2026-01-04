#!/usr/bin/env node
/**
 * Setup Stripe Products for Elevate for Humanity Programs
 * Creates products and prices for all training programs
 */

import Stripe from 'stripe';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
config({ path: join(__dirname, '..', '.env.local') });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
});

const PROGRAMS = [
  {
    name: 'Barber Apprenticeship',
    description: 'Complete barber training with Milady RISE certification',
    price: 489000, // $4,890.00 (in cents)
    paymentPlans: [
      { name: 'Full Payment', amount: 489000, installments: 1 },
      { name: '3-Month Plan', amount: 163000, installments: 3 },
      { name: '6-Month Plan', amount: 81500, installments: 6 },
    ],
    metadata: {
      program_slug: 'barber',
      vendor_name: 'milady',
      vendor_cost: '295',
    },
  },
  {
    name: 'Direct Support Professional (DSP)',
    description: 'Become a certified Direct Support Professional',
    price: 432500, // $4,325.00 (in cents)
    paymentPlans: [
      { name: 'Full Payment', amount: 432500, installments: 1 },
      { name: '3-Month Plan', amount: 144200, installments: 3 },
      { name: '6-Month Plan', amount: 72100, installments: 6 },
    ],
    metadata: {
      program_slug: 'dsp',
      vendor_name: 'null',
      vendor_cost: '0',
    },
  },
  {
    name: 'HVAC Technician',
    description: 'HVAC installation and repair certification',
    price: 500000, // $5,000.00 (in cents)
    paymentPlans: [
      { name: 'Full Payment', amount: 500000, installments: 1 },
      { name: '3-Month Plan', amount: 166700, installments: 3 },
      { name: '6-Month Plan', amount: 83400, installments: 6 },
    ],
    metadata: {
      program_slug: 'hvac',
      vendor_name: 'null',
      vendor_cost: '0',
    },
  },
  {
    name: 'CPR Certification',
    description: 'American Heart Association CPR certification',
    price: 57500, // $575.00 (in cents)
    paymentPlans: [
      { name: 'Full Payment', amount: 57500, installments: 1 },
    ],
    metadata: {
      program_slug: 'cpr',
      vendor_name: 'null',
      vendor_cost: '0',
    },
  },
  {
    name: 'Emergency Health & Safety Tech',
    description: 'Emergency medical and safety technician training',
    price: 495000, // $4,950.00 (in cents)
    paymentPlans: [
      { name: 'Full Payment', amount: 495000, installments: 1 },
      { name: '3-Month Plan', amount: 165000, installments: 3 },
      { name: '6-Month Plan', amount: 82500, installments: 6 },
    ],
    metadata: {
      program_slug: 'ehst',
      vendor_name: 'null',
      vendor_cost: '0',
    },
  },
  {
    name: 'Professional Esthetician',
    description: 'Licensed esthetician training and certification',
    price: 457500, // $4,575.00 (in cents)
    paymentPlans: [
      { name: 'Full Payment', amount: 457500, installments: 1 },
      { name: '3-Month Plan', amount: 152500, installments: 3 },
      { name: '6-Month Plan', amount: 76300, installments: 6 },
    ],
    metadata: {
      program_slug: 'esth',
      vendor_name: 'null',
      vendor_cost: '0',
    },
  },
  {
    name: 'Peer Recovery Coach',
    description: 'Certified peer recovery specialist training',
    price: 475000, // $4,750.00 (in cents)
    paymentPlans: [
      { name: 'Full Payment', amount: 475000, installments: 1 },
      { name: '3-Month Plan', amount: 158400, installments: 3 },
      { name: '6-Month Plan', amount: 79200, installments: 6 },
    ],
    metadata: {
      program_slug: 'prc',
      vendor_name: 'null',
      vendor_cost: '0',
    },
  },
  {
    name: 'Tax Prep & Financial Services',
    description: 'IRS-certified tax preparer training',
    price: 495000, // $4,950.00 (in cents)
    paymentPlans: [
      { name: 'Full Payment', amount: 495000, installments: 1 },
      { name: '3-Month Plan', amount: 165000, installments: 3 },
      { name: '6-Month Plan', amount: 82500, installments: 6 },
    ],
    metadata: {
      program_slug: 'tax',
      vendor_name: 'null',
      vendor_cost: '0',
    },
  },
  {
    name: 'Business Startup & Marketing',
    description: 'Launch and grow your business',
    price: 455000, // $4,550.00 (in cents)
    paymentPlans: [
      { name: 'Full Payment', amount: 455000, installments: 1 },
      { name: '3-Month Plan', amount: 151700, installments: 3 },
      { name: '6-Month Plan', amount: 75900, installments: 6 },
    ],
    metadata: {
      program_slug: 'biz',
      vendor_name: 'null',
      vendor_cost: '0',
    },
  },
];

async function createProduct(programData) {
  console.log(`\n📦 Creating product: ${programData.name}`);
  
  try {
    // Create Stripe product
    const product = await stripe.products.create({
      name: programData.name,
      description: programData.description,
      metadata: programData.metadata,
      default_price_data: {
        currency: 'usd',
        unit_amount: programData.price,
      },
    });

    console.log(`✅ Product created: ${product.id}`);
    console.log(`   Default price: ${product.default_price}`);

    // Create additional payment plan prices
    const prices = [];
    for (const plan of programData.paymentPlans) {
      if (plan.installments === 1) {
        // Skip - already created as default price
        prices.push({
          id: product.default_price,
          name: plan.name,
          amount: plan.amount,
          installments: 1,
        });
        continue;
      }

      const price = await stripe.prices.create({
        product: product.id,
        currency: 'usd',
        unit_amount: plan.amount,
        recurring: {
          interval: 'month',
          interval_count: 1,
        },
        metadata: {
          payment_plan: plan.name,
          installments: plan.installments.toString(),
          total_amount: (plan.amount * plan.installments).toString(),
        },
      });

      prices.push({
        id: price.id,
        name: plan.name,
        amount: plan.amount,
        installments: plan.installments,
      });

      console.log(`   💳 Payment plan created: ${plan.name} - ${price.id}`);
    }

    return {
      product,
      prices,
    };
  } catch (error) {
    console.error(`❌ Error creating product: ${error.message}`);
    console.error(`   Full error:`, error);
    return null;
  }
}

async function main() {
  console.log('🚀 Setting up Stripe products for Elevate for Humanity\n');
  console.log('=' .repeat(70));

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY not found in environment variables');
    console.error('   Please set it in your .env.local file');
    process.exit(1);
  }

  const results = [];

  for (const program of PROGRAMS) {
    const result = await createProduct(program);
    if (result) {
      results.push({
        program: program.name,
        slug: program.metadata.program_slug,
        productId: result.product.id,
        defaultPriceId: result.product.default_price,
        paymentPlans: result.prices,
      });
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('\n✅ Setup complete!\n');
  console.log('📋 Product Summary:');
  console.log(JSON.stringify(results, null, 2));

  console.log('\n💡 Next steps:');
  console.log('1. Save these product IDs in your database');
  console.log('2. Update your .env.local with product IDs if needed');
  console.log('3. Test checkout flow with test card: 4242 4242 4242 4242');
  console.log('\n🔗 View products in Stripe Dashboard:');
  console.log('   https://dashboard.stripe.com/products\n');
}

main().catch(console.error);
