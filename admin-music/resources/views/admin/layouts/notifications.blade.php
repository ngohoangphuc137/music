<button class="btn bg-gradient-success w-100 mb-0 toast-btn successToast" hidden type="button" data-target="successToast">Success</button>
<button class="btn bg-gradient-danger w-100 mb-0 toast-btn dangerToast" hidden type="button" data-target="dangerToast">Danger</button>
<div class="position-fixed top-1 end-1 z-index-3">
    <div class="toast fade hide p-2 bg-white" role="alert" aria-live="assertive" id="successToast" aria-atomic="true">
        <div class="toast-header border-0">
            <i class="material-icons text-success me-2">check</i>
            <span class="me-auto font-weight-bold">Xoá thành công</span>
            <small class="text-body"></small>
            <i class="fas fa-times text-md ms-3 cursor-pointer" data-bs-dismiss="toast" aria-label="Close"></i>
        </div>
    </div>
    <div class="toast fade hide p-2 mt-2 bg-white" role="alert" aria-live="assertive" id="dangerToast"
        aria-atomic="true">
        <div class="toast-header border-0">
            <i class="material-icons text-danger me-2">campaign</i>
            <span class="me-auto text-gradient text-danger font-weight-bold">Lỗi</span>
            <small class="text-body"></small>
            <i class="fas fa-times text-md ms-3 cursor-pointer" data-bs-dismiss="toast" aria-label="Close"></i>
        </div>
    </div>
</div>