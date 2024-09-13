/** @jsxImportSource @emotion/react */
import Title from "antd/es/typography/Title";
import { useGetCompaniesQuery } from "../api/companies";
import {
	useCreateJobMutation,
	useDeleteJobMutation,
	useEditJobMutation,
	useGetJobsQuery,
} from "../api/jobs";
import { ICompany, IJob } from "../interface";
import { Loading } from "./loading";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import {
	Button,
	Drawer,
	Form,
	Input,
	message,
	Select,
	Table,
} from "antd";
import { useEffect, useMemo } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

export const Jobs = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const {
		data: companies,
		isLoading: companyLoading,
		error: companyError,
	} = useGetCompaniesQuery(undefined);

	const {
		data: jobs,
		isLoading: jobLoading,
		error: jobError,
	} = useGetJobsQuery(undefined);

	const [editJob] = useEditJobMutation();
	const [deleteJob] = useDeleteJobMutation();
	const [createJob] = useCreateJobMutation();

	const params = queryString.parse(location.search, {
		parseNumbers: true,
		parseBooleans: true,
	});

	const editingJob = useMemo(() => {
		if (jobs) {
			return jobs.find((p: IJob) => p.id === params.id);
		}
		return null;
	}, [params.id, jobs]);

	useEffect(() => {
		if (editingJob) {
			form.setFieldsValue(editingJob);
		} else {
			form.resetFields();
		}
	}, [editingJob]);

	if (companyLoading || jobLoading) return <Loading />;
	if (companyError) {
		console.error(companyError);
		return <div>Error fetching categories</div>;
	}
	if (jobError) {
		console.error(jobError);
		return <div>Error fetching products</div>;
	}

	const columns = [
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "desc",
		},
		{
			title: "Tech",
			dataIndex: "technologies",
			key: "tech",
		},
		{
			title: "Location",
			dataIndex: "location",
			key: "loc",
		},
		{
			title: "Salary",
			dataIndex: "salary",
			key: "salary",
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			render: (url: string) => (
				<Button type={"link"}>{url}</Button>
			)
		},
		{
			title: "TG",
			dataIndex: "telegram",
			key: "telegram",
			render: (url: string) => (
				<Button type={"link"}>{url}</Button>
			)
		},
		{
			title: "Insta",
			dataIndex: "instagram",
			key: "imstagram",
		},
		{
			title: "Company",
			dataIndex: "companyId",
			key: "company",
			render: (id: string | number) => {
				const company = companies.find(
					(j: ICompany) => j.id == id
				);
				return <div>{company.title}</div>;
			},
		},
		{
			title: "Actions",
			key: "actions",
			dataIndex: "id",
			render: (_: number | string, record: ICompany) => (
				<div>
					<Button
						shape="circle"
						css={{
							width: "40px",
							height: "40px",
							marginRight: "10px",
							fontSize: "18px",
						}}
						onClick={() => {
							onEdit(record.id);
						}}
					>
						<MdOutlineModeEdit />
					</Button>
					<Button
						css={{
							width: "40px",
							height: "40px",
							fontSize: "16px",
						}}
						shape="circle"
						danger
						onClick={() => {
							onDelete(record.id);
						}}
					>
						<FaRegTrashCan />
					</Button>
				</div>
			),
		},
	];

	const onEdit = (id: number | string) => {
		navigate(
			"?" +
				queryString.stringify({
					add: true,
					id,
				})
		);
	};

	const onDelete = (id: number | string) => {
		console.log(id);
		deleteJob({ id });
		message.success("Job deleted successfully");
	};

	const onFinish = () => {
		const data = form.getFieldsValue();
		if (editingJob) {
			console.log("edit", data);
			if (params.id) {
				editJob({
					id: editingJob.id,
					newJob: data,
				});
				message.success("Job changed successfully");
			}
		} else {
			console.log("add", data);
			createJob(data);
			message.success("Job created successfully");
		}
	};

	return (
		<div>
			<div className="flex items-center justify-between">
				<Title level={3}>Products</Title>
				<Button
					type={"primary"}
					onClick={() => {
						navigate(
							"?" +
								queryString.stringify({
									add: true,
								})
						);
					}}
				>
					<FaPlus />
				</Button>
			</div>
			<Table columns={columns} dataSource={jobs} />
			<Drawer
				title="Product"
				open={Boolean(params.add || params.edit)}
				onClose={() => {
					navigate("?" + queryString.stringify({}));
				}}
			>
				<Form
					form={form}
					layout="vertical"
					onFinish={onFinish}
				>
					<Form.Item
						name="title"
						label="Title"
						rules={[
							{
								required: true,
								message: "Please enter name",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item name="description" label="Description">
						<Input />
					</Form.Item>
					<Form.Item
						name="technologies"
						label="Technologies"
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="location"
						label="Location"
						rules={[
							{
								required: true,
								message: "Please enter location",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="salary"
						label="Salary"
						rules={[
							{
								required: true,
								message: "Please enter salary",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item name="phone" label="Phone">
						<Input />
					</Form.Item>
					<Form.Item name="telegram" label="Telegram">
						<Input />
					</Form.Item>
					<Form.Item name="instagram" label="Instagram">
						<Input />
					</Form.Item>
					<Form.Item
						name="companyId"
						label="Company"
						rules={[
							{
								required: true,
								message: "Please select company",
							},
						]}
					>
						<Select
							css={{
								width: "100%",
							}}
							onChange={(e) => {
								form.setFieldsValue({
									companyId: e.target.value,
								});
							}}
						>
							{companies.map((c: ICompany) => {
								return (
									<Select.Option value={c.id}>
										{c.title}
									</Select.Option>
								);
							})}
						</Select>
					</Form.Item>
					<Button type="primary" htmlType="submit">
						Save
					</Button>
				</Form>
			</Drawer>
		</div>
	);
};
