import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  // Replace with your real VAPID public key (must be Base64URL encoded)
  readonly VAPID_PUBLIC_KEY =
    'BBmtpu4SvoU5Aj9jmY1qRVMDK90JHE-KB4tevGjOp2RAtwHXfMO8YOyd0jLs8ehVJUnI0UMR-QQn2C1S-Rh4OpY';

  constructor(private swPush: SwPush, private http: HttpClient) {}

  /** Check if notifications are supported in this environment */
  isSupported(): boolean {
    return (
      'Notification' in window &&
      'serviceWorker' in navigator &&
      'PushManager' in window
    );
  }

  /** Ask the user for permission and subscribe if granted */
  async requestPermission() {
    if (!this.isSupported()) {
      alert('Notifications are not supported in this browser or device.');
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      console.log('✅ Notification permission granted.');
      this.ensureSubscription();
    } else if (permission === 'denied') {
      console.warn('🚫 Notification permission denied.');
    } else {
      console.log('🔕 Notification permission dismissed.');
    }
  }

  /**
   * Ensures the user has a valid push subscription.
   * - If one exists, resend it to backend (retry)
   * - If not, create a new one
   */
  async ensureSubscription() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSub = await registration.pushManager.getSubscription();

      if (existingSub) {
        console.log('📬 Existing subscription found, retrying backend send...');
        this.sendSubscriptionToBackend(existingSub);
      } else {
        console.log('📭 No existing subscription, creating new one...');
        this.createNewSubscription();
      }
    } catch (err) {
      console.error('Error checking subscription:', err);
    }
  }

  /** Create a new push subscription */
  private async createNewSubscription() {
    try {
      const sub = await this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      });
      console.log('✅ New push subscription created:', sub);
      this.sendSubscriptionToBackend(sub);
    } catch (err) {
      console.error('Could not create push subscription', err);
    }
  }

  /** Send the subscription object to your backend */
  private sendSubscriptionToBackend(sub: PushSubscription) {
    this.http.post('/chat/subscribe', sub).subscribe({
      next: () => console.log('📨 Subscription sent successfully to backend.'),
      error: (err) => {
        console.error('🚫 Error sending subscription to backend:', err);
        // Optional retry logic if backend temporarily failed
        setTimeout(() => {
          console.log('🔁 Retrying subscription send...');
          this.http.post('/chat/subscribe', sub).subscribe({
            next: () => console.log('✅ Retried subscription sent successfully.'),
            error: (retryErr) =>
              console.error('❌ Retry also failed:', retryErr),
          });
        }, 5000); // retry after 5 seconds
      },
    });
  }
}
