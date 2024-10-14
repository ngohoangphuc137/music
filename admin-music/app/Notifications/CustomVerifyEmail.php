<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Carbon;

class CustomVerifyEmail extends Notification
{
    // use Queueable;

    /**
     * Create a new notification instance.
     */
    public $user;
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $verificationUrl = $this->verificationUrl($notifiable);
        return (new MailMessage)
            ->subject('Xác nhận email của' . $this->user->name)
            ->line($this->user->name)
            ->line('Your email' . $this->user->email . ' must be confirmed before using it to log in to our store.')
            ->line('Click here to confirm your email and instantly log in (the link is valid only once)')
            ->action('Confirm Account', $verificationUrl)
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
    protected function verificationUrl($notifiable)
    {
        return URL::temporarySignedRoute(
            'verification.verify', // Route cần được xác minh
            Carbon::now()->addMinutes(60), // Thời gian hết hạn của URL
            [
                'id' => $notifiable->getKey(), // ID của người dùng
                'hash' => sha1($notifiable->getEmailForVerification()), // Hash của email
            ]
        );
    }
}
