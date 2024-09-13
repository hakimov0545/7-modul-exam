/** @jsxImportSource @emotion/react */
import Title from "antd/es/typography/Title";
import { ICompany, IJob } from "../interface";
import { Loading } from "./loading";
import { Button, Drawer, Form, Input, message, Table } from "antd";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import {
	useCreateCompanyMutation,
	useDeleteCompanyMutation,
	useEditCompanyMutation,
	useGetCompaniesQuery,
} from "../api/companies";
import { useGetJobsQuery } from "../api/jobs";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

export const Companies = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const {
		data: companies,
		isLoading: companyLoading,
		error: companyError,
	} = useGetCompaniesQuery(undefined);

	const [editCompany] = useEditCompanyMutation();
	const [deleteCompany] = useDeleteCompanyMutation();
	const [createCompany] = useCreateCompanyMutation();

	const params = queryString.parse(location.search, {
		parseNumbers: true,
		parseBooleans: true,
	});

	const editingCompany = useMemo(() => {
		if (companies) {
			return companies.find((p: IJob) => p.id === params.id);
		}
		return null;
	}, [params.id, companies]);

	useEffect(() => {
		if (editingCompany) {
			form.setFieldsValue(editingCompany);
		} else {
			form.resetFields();
		}
	}, [editingCompany]);

	const {
		data: jobs,
		isLoading: jobLoading,
		error: jobError,
	} = useGetJobsQuery(undefined);

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
		deleteCompany(id);
		message.success("Company deleted successfully");
	};

	const onFinish = async () => {
		const data = form.getFieldsValue();
		if (editingCompany) {
			console.log("edit", data);
			if (params.id) {
				editCompany({
					id: editingCompany.id,
					newCompany: data,
				});
				message.success("Company changed successfully");
			}
		} else {
			console.log("add", data);
			createCompany(data);
			message.success("Company created successfully");
		}
	};

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
			title: "Image",
			dataIndex: "image",
			key: "image",
			render: (image: string) => {
				console.log({ image });

				return (
					<img
						css={{
							width: "50px",
							objectFit: "cover",
						}}
						src={image}
						alt="Company image"
					/>
				);
			},
		},
		{
			title: "Website",
			dataIndex: "website",
			key: "website",
			render: (url: string) => (
				<Button type={"link"}>{url}</Button>
			)
		},
		{
			title: "Jobs",
			dataIndex: "id",
			key: "jobs",
			render: (_: string | number, record: ICompany) => {
				const job = jobs.filter(
					(j: IJob) => j.companyId == record.id
				);
				return <div>{job.length}</div>;
			},
		},
		{
			title: "Actions",
			key: "actions",
			dataIndex: "id",
			render: (_: string | number, record: ICompany) => (
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

	return (
		<div>
			<div className="flex items-center justify-between">
				<Title level={3}>Companies</Title>
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
			<Table columns={columns} dataSource={companies} />
			<Drawer
				title="Category"
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
					<Form.Item name="image" label="Image">
						<Input />
					</Form.Item>
					<Form.Item name="website" label="Website">
						<Input />
					</Form.Item>
					<Form.Item name="description" label="Description">
						<Input />
					</Form.Item>
					<Button type="primary" htmlType="submit">
						Save
					</Button>
				</Form>
			</Drawer>
		</div>
	);
};
