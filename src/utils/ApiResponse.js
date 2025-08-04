//Standard structure of ApiResponse
class ApiResponse{
    constructor(statusCode,data,message="Success",meta = null){
        this.statusCode=statusCode;
        this.data=data;
        this.message=message;
        this.success=statusCode<400;  // dealing with api respone that's why below 400.
        this.timestamp = new Date().toISOString();
        if (meta) this.meta = meta;
    }
}

export { ApiResponse };