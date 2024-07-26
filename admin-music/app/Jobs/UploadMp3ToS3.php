<?php

namespace App\Jobs;
use Illuminate\Support\Facades\Storage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UploadMp3ToS3 implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    protected $filePath;
    public function __construct($filePath)
    {
        $this->filePath = $filePath;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {

        // Đặt tên file chính xác khi upload lên S3
        $s3FilePath = Storage::disk('public')->get($this->filePath);

        Storage::disk('s3')->put('songs/'.basename($this->filePath), $s3FilePath);

        // Xóa file tạm thời sau khi đã lưu vào S3
        Storage::disk('public')->delete($this->filePath);
    }
}
