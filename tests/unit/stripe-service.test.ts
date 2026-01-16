/**
 * Stripe Service Tests
 * 
 * Tests for the StripeService class methods
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { stripeService, StripeService } from '@/lib/payments/stripe';

describe('StripeService', () => {
  describe('getSubscription', () => {
    it('should return null when subscriptionId is empty', async () => {
      const result = await stripeService.getSubscription('');
      expect(result).toBeNull();
    });

    it('should return null when subscriptionId is undefined', async () => {
      const result = await stripeService.getSubscription(undefined as unknown as string);
      expect(result).toBeNull();
    });

    it('should return subscription data when valid subscriptionId is provided', async () => {
      const subscriptionId = 'sub_test123';
      const result = await stripeService.getSubscription(subscriptionId);
      
      expect(result).not.toBeNull();
      expect(result?.id).toBe(subscriptionId);
      expect(result?.status).toBe('active');
      expect(result?.customerId).toBeDefined();
      expect(result?.priceId).toBeDefined();
      expect(result?.currentPeriodEnd).toBeInstanceOf(Date);
      expect(typeof result?.cancelAtPeriodEnd).toBe('boolean');
    });
  });

  describe('createRefund', () => {
    it('should return false when paymentIntentId is empty', async () => {
      const result = await stripeService.createRefund('');
      expect(result).toBe(false);
    });

    it('should return false when paymentIntentId is undefined', async () => {
      const result = await stripeService.createRefund(undefined as unknown as string);
      expect(result).toBe(false);
    });

    it('should return true when valid paymentIntentId is provided', async () => {
      const result = await stripeService.createRefund('pi_test123');
      expect(result).toBe(true);
    });

    it('should return true when valid paymentIntentId and amount are provided', async () => {
      const result = await stripeService.createRefund('pi_test123', 5000);
      expect(result).toBe(true);
    });
  });

  describe('createPaymentIntent', () => {
    it('should create a payment intent with correct amount', async () => {
      const amount = 2999;
      const result = await stripeService.createPaymentIntent(amount);
      
      expect(result.amount).toBe(amount);
      expect(result.currency).toBe('usd');
      expect(result.status).toBe('requires_payment_method');
      expect(result.id).toMatch(/^pi_/);
      expect(result.clientSecret).toBeDefined();
    });

    it('should create a payment intent with custom currency', async () => {
      const result = await stripeService.createPaymentIntent(1000, 'eur');
      expect(result.currency).toBe('eur');
    });
  });

  describe('createSubscription', () => {
    it('should create a subscription with correct data', async () => {
      const customerId = 'cus_test123';
      const priceId = 'price_test123';
      const result = await stripeService.createSubscription(customerId, priceId);
      
      expect(result.customerId).toBe(customerId);
      expect(result.priceId).toBe(priceId);
      expect(result.status).toBe('active');
      expect(result.id).toMatch(/^sub_/);
      expect(result.cancelAtPeriodEnd).toBe(false);
    });
  });

  describe('cancelSubscription', () => {
    it('should cancel a subscription', async () => {
      const subscriptionId = 'sub_test123';
      const result = await stripeService.cancelSubscription(subscriptionId);
      
      expect(result.id).toBe(subscriptionId);
      expect(result.status).toBe('canceled');
      expect(result.cancelAtPeriodEnd).toBe(true);
    });
  });

  describe('createCustomer', () => {
    it('should create a customer and return customer ID', async () => {
      const result = await stripeService.createCustomer('test@example.com', 'Test User');
      expect(result).toMatch(/^cus_/);
    });
  });

  describe('listProducts', () => {
    it('should return a list of products', async () => {
      const result = await stripeService.listProducts();
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      
      const product = result[0];
      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.price).toBeGreaterThan(0);
      expect(product.currency).toBe('usd');
    });
  });
});
