// Code generated by protoc-gen-go. DO NOT EDIT.
// source: iot.proto

package pb

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"

import (
	context "golang.org/x/net/context"
	grpc "google.golang.org/grpc"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion2 // please upgrade the proto package

// OBJECTS
type CellarSpace struct {
	Id                   string   `protobuf:"bytes,1,opt,name=Id,proto3" json:"Id,omitempty"`
	Name                 string   `protobuf:"bytes,2,opt,name=Name,proto3" json:"Name,omitempty"`
	State                string   `protobuf:"bytes,3,opt,name=State,proto3" json:"State,omitempty"`
	Image                string   `protobuf:"bytes,4,opt,name=Image,proto3" json:"Image,omitempty"`
	Path                 string   `protobuf:"bytes,5,opt,name=Path,proto3" json:"Path,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *CellarSpace) Reset()         { *m = CellarSpace{} }
func (m *CellarSpace) String() string { return proto.CompactTextString(m) }
func (*CellarSpace) ProtoMessage()    {}
func (*CellarSpace) Descriptor() ([]byte, []int) {
	return fileDescriptor_iot_abb1af786f7577af, []int{0}
}
func (m *CellarSpace) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_CellarSpace.Unmarshal(m, b)
}
func (m *CellarSpace) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_CellarSpace.Marshal(b, m, deterministic)
}
func (dst *CellarSpace) XXX_Merge(src proto.Message) {
	xxx_messageInfo_CellarSpace.Merge(dst, src)
}
func (m *CellarSpace) XXX_Size() int {
	return xxx_messageInfo_CellarSpace.Size(m)
}
func (m *CellarSpace) XXX_DiscardUnknown() {
	xxx_messageInfo_CellarSpace.DiscardUnknown(m)
}

var xxx_messageInfo_CellarSpace proto.InternalMessageInfo

func (m *CellarSpace) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *CellarSpace) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *CellarSpace) GetState() string {
	if m != nil {
		return m.State
	}
	return ""
}

func (m *CellarSpace) GetImage() string {
	if m != nil {
		return m.Image
	}
	return ""
}

func (m *CellarSpace) GetPath() string {
	if m != nil {
		return m.Path
	}
	return ""
}

type CellarSenzor struct {
	Id                   string   `protobuf:"bytes,1,opt,name=Id,proto3" json:"Id,omitempty"`
	Name                 string   `protobuf:"bytes,2,opt,name=Name,proto3" json:"Name,omitempty"`
	State                string   `protobuf:"bytes,3,opt,name=State,proto3" json:"State,omitempty"`
	Path                 string   `protobuf:"bytes,4,opt,name=Path,proto3" json:"Path,omitempty"`
	Type                 string   `protobuf:"bytes,5,opt,name=Type,proto3" json:"Type,omitempty"`
	Firmware             string   `protobuf:"bytes,6,opt,name=Firmware,proto3" json:"Firmware,omitempty"`
	IpAdrress            string   `protobuf:"bytes,7,opt,name=IpAdrress,proto3" json:"IpAdrress,omitempty"`
	WifiSSID             string   `protobuf:"bytes,8,opt,name=WifiSSID,proto3" json:"WifiSSID,omitempty"`
	WifiPassword         string   `protobuf:"bytes,9,opt,name=WifiPassword,proto3" json:"WifiPassword,omitempty"`
	MQTTUrl              string   `protobuf:"bytes,10,opt,name=MQTTUrl,proto3" json:"MQTTUrl,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *CellarSenzor) Reset()         { *m = CellarSenzor{} }
func (m *CellarSenzor) String() string { return proto.CompactTextString(m) }
func (*CellarSenzor) ProtoMessage()    {}
func (*CellarSenzor) Descriptor() ([]byte, []int) {
	return fileDescriptor_iot_abb1af786f7577af, []int{1}
}
func (m *CellarSenzor) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_CellarSenzor.Unmarshal(m, b)
}
func (m *CellarSenzor) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_CellarSenzor.Marshal(b, m, deterministic)
}
func (dst *CellarSenzor) XXX_Merge(src proto.Message) {
	xxx_messageInfo_CellarSenzor.Merge(dst, src)
}
func (m *CellarSenzor) XXX_Size() int {
	return xxx_messageInfo_CellarSenzor.Size(m)
}
func (m *CellarSenzor) XXX_DiscardUnknown() {
	xxx_messageInfo_CellarSenzor.DiscardUnknown(m)
}

var xxx_messageInfo_CellarSenzor proto.InternalMessageInfo

func (m *CellarSenzor) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *CellarSenzor) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *CellarSenzor) GetState() string {
	if m != nil {
		return m.State
	}
	return ""
}

func (m *CellarSenzor) GetPath() string {
	if m != nil {
		return m.Path
	}
	return ""
}

func (m *CellarSenzor) GetType() string {
	if m != nil {
		return m.Type
	}
	return ""
}

func (m *CellarSenzor) GetFirmware() string {
	if m != nil {
		return m.Firmware
	}
	return ""
}

func (m *CellarSenzor) GetIpAdrress() string {
	if m != nil {
		return m.IpAdrress
	}
	return ""
}

func (m *CellarSenzor) GetWifiSSID() string {
	if m != nil {
		return m.WifiSSID
	}
	return ""
}

func (m *CellarSenzor) GetWifiPassword() string {
	if m != nil {
		return m.WifiPassword
	}
	return ""
}

func (m *CellarSenzor) GetMQTTUrl() string {
	if m != nil {
		return m.MQTTUrl
	}
	return ""
}

type GetAllSpacesRequest struct {
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *GetAllSpacesRequest) Reset()         { *m = GetAllSpacesRequest{} }
func (m *GetAllSpacesRequest) String() string { return proto.CompactTextString(m) }
func (*GetAllSpacesRequest) ProtoMessage()    {}
func (*GetAllSpacesRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_iot_abb1af786f7577af, []int{2}
}
func (m *GetAllSpacesRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_GetAllSpacesRequest.Unmarshal(m, b)
}
func (m *GetAllSpacesRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_GetAllSpacesRequest.Marshal(b, m, deterministic)
}
func (dst *GetAllSpacesRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_GetAllSpacesRequest.Merge(dst, src)
}
func (m *GetAllSpacesRequest) XXX_Size() int {
	return xxx_messageInfo_GetAllSpacesRequest.Size(m)
}
func (m *GetAllSpacesRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_GetAllSpacesRequest.DiscardUnknown(m)
}

var xxx_messageInfo_GetAllSpacesRequest proto.InternalMessageInfo

type GetAllSpacesResponse struct {
	Data                 []*CellarSpace `protobuf:"bytes,1,rep,name=Data,proto3" json:"Data,omitempty"`
	XXX_NoUnkeyedLiteral struct{}       `json:"-"`
	XXX_unrecognized     []byte         `json:"-"`
	XXX_sizecache        int32          `json:"-"`
}

func (m *GetAllSpacesResponse) Reset()         { *m = GetAllSpacesResponse{} }
func (m *GetAllSpacesResponse) String() string { return proto.CompactTextString(m) }
func (*GetAllSpacesResponse) ProtoMessage()    {}
func (*GetAllSpacesResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_iot_abb1af786f7577af, []int{3}
}
func (m *GetAllSpacesResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_GetAllSpacesResponse.Unmarshal(m, b)
}
func (m *GetAllSpacesResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_GetAllSpacesResponse.Marshal(b, m, deterministic)
}
func (dst *GetAllSpacesResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_GetAllSpacesResponse.Merge(dst, src)
}
func (m *GetAllSpacesResponse) XXX_Size() int {
	return xxx_messageInfo_GetAllSpacesResponse.Size(m)
}
func (m *GetAllSpacesResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_GetAllSpacesResponse.DiscardUnknown(m)
}

var xxx_messageInfo_GetAllSpacesResponse proto.InternalMessageInfo

func (m *GetAllSpacesResponse) GetData() []*CellarSpace {
	if m != nil {
		return m.Data
	}
	return nil
}

type GetSenzorRequest struct {
	Id                   string   `protobuf:"bytes,1,opt,name=Id,proto3" json:"Id,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *GetSenzorRequest) Reset()         { *m = GetSenzorRequest{} }
func (m *GetSenzorRequest) String() string { return proto.CompactTextString(m) }
func (*GetSenzorRequest) ProtoMessage()    {}
func (*GetSenzorRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_iot_abb1af786f7577af, []int{4}
}
func (m *GetSenzorRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_GetSenzorRequest.Unmarshal(m, b)
}
func (m *GetSenzorRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_GetSenzorRequest.Marshal(b, m, deterministic)
}
func (dst *GetSenzorRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_GetSenzorRequest.Merge(dst, src)
}
func (m *GetSenzorRequest) XXX_Size() int {
	return xxx_messageInfo_GetSenzorRequest.Size(m)
}
func (m *GetSenzorRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_GetSenzorRequest.DiscardUnknown(m)
}

var xxx_messageInfo_GetSenzorRequest proto.InternalMessageInfo

func (m *GetSenzorRequest) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

type GetSenzorResponse struct {
	Data                 *CellarSenzor `protobuf:"bytes,1,opt,name=Data,proto3" json:"Data,omitempty"`
	XXX_NoUnkeyedLiteral struct{}      `json:"-"`
	XXX_unrecognized     []byte        `json:"-"`
	XXX_sizecache        int32         `json:"-"`
}

func (m *GetSenzorResponse) Reset()         { *m = GetSenzorResponse{} }
func (m *GetSenzorResponse) String() string { return proto.CompactTextString(m) }
func (*GetSenzorResponse) ProtoMessage()    {}
func (*GetSenzorResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_iot_abb1af786f7577af, []int{5}
}
func (m *GetSenzorResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_GetSenzorResponse.Unmarshal(m, b)
}
func (m *GetSenzorResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_GetSenzorResponse.Marshal(b, m, deterministic)
}
func (dst *GetSenzorResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_GetSenzorResponse.Merge(dst, src)
}
func (m *GetSenzorResponse) XXX_Size() int {
	return xxx_messageInfo_GetSenzorResponse.Size(m)
}
func (m *GetSenzorResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_GetSenzorResponse.DiscardUnknown(m)
}

var xxx_messageInfo_GetSenzorResponse proto.InternalMessageInfo

func (m *GetSenzorResponse) GetData() *CellarSenzor {
	if m != nil {
		return m.Data
	}
	return nil
}

func init() {
	proto.RegisterType((*CellarSpace)(nil), "pb.CellarSpace")
	proto.RegisterType((*CellarSenzor)(nil), "pb.CellarSenzor")
	proto.RegisterType((*GetAllSpacesRequest)(nil), "pb.GetAllSpacesRequest")
	proto.RegisterType((*GetAllSpacesResponse)(nil), "pb.GetAllSpacesResponse")
	proto.RegisterType((*GetSenzorRequest)(nil), "pb.GetSenzorRequest")
	proto.RegisterType((*GetSenzorResponse)(nil), "pb.GetSenzorResponse")
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// IoTServiceClient is the client API for IoTService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type IoTServiceClient interface {
	GetAllSpaces(ctx context.Context, in *GetAllSpacesRequest, opts ...grpc.CallOption) (*GetAllSpacesResponse, error)
	GetSenzor(ctx context.Context, in *GetSenzorRequest, opts ...grpc.CallOption) (*GetSenzorResponse, error)
}

type ioTServiceClient struct {
	cc *grpc.ClientConn
}

func NewIoTServiceClient(cc *grpc.ClientConn) IoTServiceClient {
	return &ioTServiceClient{cc}
}

func (c *ioTServiceClient) GetAllSpaces(ctx context.Context, in *GetAllSpacesRequest, opts ...grpc.CallOption) (*GetAllSpacesResponse, error) {
	out := new(GetAllSpacesResponse)
	err := c.cc.Invoke(ctx, "/pb.IoTService/GetAllSpaces", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *ioTServiceClient) GetSenzor(ctx context.Context, in *GetSenzorRequest, opts ...grpc.CallOption) (*GetSenzorResponse, error) {
	out := new(GetSenzorResponse)
	err := c.cc.Invoke(ctx, "/pb.IoTService/GetSenzor", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// IoTServiceServer is the server API for IoTService service.
type IoTServiceServer interface {
	GetAllSpaces(context.Context, *GetAllSpacesRequest) (*GetAllSpacesResponse, error)
	GetSenzor(context.Context, *GetSenzorRequest) (*GetSenzorResponse, error)
}

func RegisterIoTServiceServer(s *grpc.Server, srv IoTServiceServer) {
	s.RegisterService(&_IoTService_serviceDesc, srv)
}

func _IoTService_GetAllSpaces_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetAllSpacesRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(IoTServiceServer).GetAllSpaces(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/pb.IoTService/GetAllSpaces",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(IoTServiceServer).GetAllSpaces(ctx, req.(*GetAllSpacesRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _IoTService_GetSenzor_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetSenzorRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(IoTServiceServer).GetSenzor(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/pb.IoTService/GetSenzor",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(IoTServiceServer).GetSenzor(ctx, req.(*GetSenzorRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _IoTService_serviceDesc = grpc.ServiceDesc{
	ServiceName: "pb.IoTService",
	HandlerType: (*IoTServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetAllSpaces",
			Handler:    _IoTService_GetAllSpaces_Handler,
		},
		{
			MethodName: "GetSenzor",
			Handler:    _IoTService_GetSenzor_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "iot.proto",
}

func init() { proto.RegisterFile("iot.proto", fileDescriptor_iot_abb1af786f7577af) }

var fileDescriptor_iot_abb1af786f7577af = []byte{
	// 374 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xa4, 0x92, 0x3f, 0x6f, 0xe2, 0x40,
	0x10, 0xc5, 0xcf, 0xc6, 0xfc, 0xf1, 0x80, 0xee, 0xb8, 0x3d, 0xd0, 0xad, 0xd0, 0x15, 0x68, 0xef,
	0x0a, 0x2a, 0x0a, 0xae, 0xba, 0x4b, 0x85, 0x40, 0x41, 0x2e, 0x12, 0x11, 0xec, 0x28, 0xf5, 0x82,
	0x27, 0x89, 0x25, 0x83, 0xcd, 0xee, 0x26, 0x28, 0xa9, 0xd3, 0xe6, 0x3b, 0x47, 0xbb, 0xb6, 0xc1,
	0x90, 0x74, 0xe9, 0x66, 0x7e, 0x6f, 0xdf, 0x9b, 0xdd, 0xb1, 0xc1, 0x8d, 0x12, 0x35, 0x4c, 0x45,
	0xa2, 0x12, 0x62, 0xa7, 0x4b, 0xb6, 0x85, 0xe6, 0x04, 0xe3, 0x98, 0x0b, 0x3f, 0xe5, 0x2b, 0x24,
	0x5f, 0xc1, 0xf6, 0x42, 0x6a, 0xf5, 0xad, 0x81, 0xbb, 0xb0, 0xbd, 0x90, 0x10, 0x70, 0x2e, 0xf9,
	0x1a, 0xa9, 0x6d, 0x88, 0xa9, 0x49, 0x07, 0xaa, 0xbe, 0xe2, 0x0a, 0x69, 0xc5, 0xc0, 0xac, 0xd1,
	0xd4, 0x5b, 0xf3, 0x3b, 0xa4, 0x4e, 0x46, 0x4d, 0xa3, 0xfd, 0x73, 0xae, 0xee, 0x69, 0x35, 0xf3,
	0xeb, 0x9a, 0xbd, 0xd8, 0xd0, 0xca, 0x67, 0xe2, 0xe6, 0x39, 0x11, 0x9f, 0x18, 0x5a, 0xc4, 0x3b,
	0x87, 0x78, 0xcd, 0x82, 0xa7, 0x14, 0x8b, 0x91, 0xba, 0x26, 0x3d, 0x68, 0x9c, 0x47, 0x62, 0xbd,
	0xe3, 0x02, 0x69, 0xcd, 0xf0, 0x7d, 0x4f, 0x7e, 0x81, 0xeb, 0xa5, 0xe3, 0x50, 0x08, 0x94, 0x92,
	0xd6, 0x8d, 0x78, 0x00, 0xda, 0x79, 0x13, 0xdd, 0x46, 0xbe, 0xef, 0x4d, 0x69, 0x23, 0x73, 0x16,
	0x3d, 0x61, 0xd0, 0xd2, 0xf5, 0x9c, 0x4b, 0xb9, 0x4b, 0x44, 0x48, 0x5d, 0xa3, 0x1f, 0x31, 0x42,
	0xa1, 0x7e, 0x71, 0x15, 0x04, 0xd7, 0x22, 0xa6, 0x60, 0xe4, 0xa2, 0x65, 0x5d, 0xf8, 0x31, 0x43,
	0x35, 0x8e, 0x63, 0xb3, 0x79, 0xb9, 0xc0, 0xed, 0x03, 0x4a, 0xc5, 0xce, 0xa0, 0x73, 0x8c, 0x65,
	0x9a, 0x6c, 0x24, 0x92, 0xdf, 0xe0, 0x4c, 0xb9, 0xe2, 0xd4, 0xea, 0x57, 0x06, 0xcd, 0xd1, 0xb7,
	0x61, 0xba, 0x1c, 0x96, 0x3e, 0xdc, 0xc2, 0x88, 0x8c, 0x41, 0x7b, 0x86, 0x2a, 0x5b, 0x6b, 0x1e,
	0x78, 0xba, 0x5d, 0xf6, 0x0f, 0xbe, 0x97, 0xce, 0xe4, 0xe9, 0x7f, 0xf6, 0xe9, 0xd6, 0xa0, 0x39,
	0x6a, 0x97, 0xd2, 0xb3, 0x73, 0x46, 0x1d, 0xbd, 0x5a, 0x00, 0x5e, 0x12, 0xf8, 0x28, 0x1e, 0xa3,
	0x15, 0x92, 0x09, 0xb4, 0xca, 0x57, 0x25, 0x3f, 0xb5, 0xed, 0x83, 0x37, 0xf5, 0xe8, 0x7b, 0x21,
	0x9b, 0xcb, 0xbe, 0x90, 0xff, 0xe0, 0xee, 0xaf, 0x43, 0x3a, 0xf9, 0xc1, 0xa3, 0x17, 0xf4, 0xba,
	0x27, 0xb4, 0xf0, 0x2e, 0x6b, 0xe6, 0x3f, 0xfe, 0xfb, 0x16, 0x00, 0x00, 0xff, 0xff, 0xb7, 0x2b,
	0x89, 0xf0, 0xd4, 0x02, 0x00, 0x00,
}
