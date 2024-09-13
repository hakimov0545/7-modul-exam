/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Button, Layout as AntdLayout, Menu, theme } from "antd";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const { Header, Sider, Content } = AntdLayout;

const StyledAntdLayout = styled(AntdLayout)`
	min-height: 100vh;
`;

export const Layout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const location = useLocation();
	console.log({ location });

	return (
		<StyledAntdLayout>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={[location.pathname]}
					onSelect={({ key }) => {
						navigate(key);
					}}
					items={[
						{
							key: "/companies",
							label: "Companies",
						},
						{
							key: "/jobs",
							label: "Jobs",
						},
					]}
				/>
			</Sider>
			<StyledAntdLayout>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				>
					<Button
						type="text"
						icon={
							collapsed ? (
								<MenuUnfoldOutlined />
							) : (
								<MenuFoldOutlined />
							)
						}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: "16px",
							width: 64,
							height: 64,
						}}
					/>
				</Header>
				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}
				>
					{children}
				</Content>
			</StyledAntdLayout>
		</StyledAntdLayout>
	);
};
